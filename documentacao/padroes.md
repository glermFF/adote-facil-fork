# Princípios SOLID e Padrões de Projeto - Backend Adote Fácil

## Visão Geral

Este documento analisa a aplicação dos princípios SOLID e padrões de projeto no backend do sistema Adote Fácil, identificando tanto os padrões já implementados quanto oportunidades de melhoria.
## Princípios SOLID

### 1. **Princípio da responsabilidade única - Aplicado**

**Definição**: Uma classe deve ter apenas uma razão para mudar.

**Exemplo Aplicado**:

```typescript
export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
    const { name, email, password } = params
    
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if (userAlreadyExists) {
      return Failure.create({ message: 'Email já cadastrado.' })
    }

    const hashedPassword = this.encrypter.encrypt(password)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return Success.create(user)
  }
}

export class Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}

export class UserRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(params: CreateUserRepositoryDTO.Params): Promise<CreateUserRepositoryDTO.Result> {
    return this.repository.user.create({ data: params })
  }
}
```

### 2. **Princípio Aberto-Fechado - Aplicado**

**Definição**: Entidades devem estar abertas para extensão, mas fechadas para modificação.

**Exemplo Aplicado**:

```typescript
export interface Encrypter {
  encrypt(value: string): string
  compare(value: string, hash: string): boolean
}

export class BcryptEncrypter implements Encrypter {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}

export class Argon2Encrypter implements Encrypter {
  encrypt(value: string): string {
    return argon2.hash(value)
  }

  compare(value: string, hash: string): boolean {
    return argon2.verify(hash, value)
  }
}
```

### 3. **Princípio da substituição de Liskov - Aplicado**

**Definição**: Objetos de uma superclasse devem poder ser substituídos por objetos de uma subclasse sem quebrar a aplicação.

**Exemplo Aplicado**:

```typescript
export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}
}

const service1 = new CreateUserService(new BcryptEncrypter(), userRepository)
const service2 = new CreateUserService(new Argon2Encrypter(), userRepository)
```

### 4. **Princípio da Segregação da Interface - Parcialmente Aplicado**

**Definição**: Clientes não devem ser forçados a depender de interfaces que não utilizam.

**Exemplo de Melhoria**:

```typescript
export interface UserRepository {
  create(params: CreateUserRepositoryDTO.Params): Promise<CreateUserRepositoryDTO.Result>
  update(params: UpdateUserRepositoryDTO.Params): Promise<any>
  findById(id: string): Promise<any>
  findByEmail(email: string): Promise<any>
  delete(id: string): Promise<any>
}

export interface UserCreator {
  create(params: CreateUserRepositoryDTO.Params): Promise<CreateUserRepositoryDTO.Result>
}

export interface UserFinder {
  findById(id: string): Promise<any>
  findByEmail(email: string): Promise<any>
}

export interface UserUpdater {
  update(params: UpdateUserRepositoryDTO.Params): Promise<any>
}

export interface UserDeleter {
  delete(id: string): Promise<any>
}

export class UserRepository implements UserCreator, UserFinder, UserUpdater, UserDeleter {
  // ...
}
```

### 5. **Princípio da inversão da dependência - Aplicado**

**Definição**: Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.

**Exemplo Aplicado**:

```typescript
export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}
}

export const createUserServiceInstance = new CreateUserService(
  encrypterInstance,
  userRepositoryInstance,
)
```

## Padrões de Projeto Identificados

### 1. **Singleton Pattern - Aplicado**

**Definição**: Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela.

**Exemplo Aplicado**:

```typescript
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const encrypterInstance = new Encrypter()
export const authenticatorInstance = new Authenticator()
export const userRepositoryInstance = new UserRepository(prisma)
export const createUserServiceInstance = new CreateUserService(
  encrypterInstance,
  userRepositoryInstance,
)
```

**Vantagens**:
- Garante uma única conexão com o banco de dados
- Evita múltiplas instâncias desnecessárias
- Economia de recursos

### 2. **Dependency Injection Pattern - Aplicado**

**Definição**: Injeta dependências em uma classe ao invés de criá-las internamente.

**Exemplo Aplicado**:

```typescript
export class CreateUserController {
  constructor(private readonly createUser: CreateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.createUser.execute(request.body)
  }
}

export class CreateUserService {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository,
  ) {}
}

export const createUserControllerInstance = new CreateUserController(
  createUserServiceInstance,
)
```

### 3. **Repository Pattern - Aplicado**

**Definição**: Abstrai a lógica de acesso a dados, centralizando operações de CRUD.

**Exemplo Aplicado**:

```typescript
export class UserRepository {
  constructor(private readonly repository: PrismaClient) {}

  async create(params: CreateUserRepositoryDTO.Params): Promise<CreateUserRepositoryDTO.Result> {
    return this.repository.user.create({ data: params })
  }

  async update(params: UpdateUserRepositoryDTO.Params) {
    return this.repository.user.update({
      where: { id: params.id },
      data: params.data,
    })
  }

  async findById(id: string) {
    return this.repository.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return this.repository.user.findUnique({ where: { email } })
  }
}
```

### 4. **Either Pattern (Monad) - Aplicado**

**Definição**: Padrão funcional para tratamento de erros, evitando exceções.

**Exemplo Aplicado**:

```typescript
export class Failure<T> {
  readonly value: T

  private constructor(value: T) {
    this.value = value
  }

  isFailure(): this is Failure<T> {
    return true
  }

  isSuccess(): this is Success<never> {
    return false
  }

  static create<U>(value: U): Failure<U> {
    return new Failure(value)
  }
}

export class Success<T> {
  readonly value: T

  private constructor(value: T) {
    this.value = value
  }

  isFailure(): this is Failure<never> {
    return false
  }

  isSuccess(): this is Success<T> {
    return true
  }

  static create<U>(value: U): Success<U> {
    return new Success(value)
  }
}

export type Either<F, S> = Failure<F> | Success<S>

async execute(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
  const userAlreadyExists = await this.userRepository.findByEmail(email)
  
  if (userAlreadyExists) {
    return Failure.create({ message: 'Email já cadastrado.' })
  }

  const user = await this.userRepository.create({ name, email, password: hashedPassword })
  return Success.create(user)
}
```

## 🔧 Padrões Sugeridos para Melhoria

### 1. **Factory Pattern - Sugerido**

**Proposta**: Criar factories para instanciação de objetos complexos.

```typescript
export class ServiceFactory {
  static createUserService(): CreateUserService {
    return new CreateUserService(
      new BcryptEncrypter(),
      new UserRepository(prisma)
    )
  }

  static createAnimalService(): CreateAnimalService {
    return new CreateAnimalService(
      new UserRepository(prisma),
      new AnimalRepository(prisma),
      new ImageUploader()
    )
  }
}

const userService = ServiceFactory.createUserService()
```

### 2. **Strategy Pattern - Sugerido**

**Proposta**: Para diferentes estratégias de autenticação e criptografia.

```typescript
export interface EncryptionStrategy {
  encrypt(value: string): string
  compare(value: string, hash: string): boolean
}

export class BcryptStrategy implements EncryptionStrategy {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10)
  }

  compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash)
  }
}

export class Argon2Strategy implements EncryptionStrategy {
  encrypt(value: string): string {
    return argon2.hash(value)
  }

  compare(value: string, hash: string): boolean {
    return argon2.verify(hash, value)
  }
}

export class Encrypter {
  constructor(private strategy: EncryptionStrategy) {}

  encrypt(value: string): string {
    return this.strategy.encrypt(value)
  }

  compare(value: string, hash: string): boolean {
    return this.strategy.compare(value, hash)
  }
}

const encrypter = new Encrypter(new BcryptStrategy())
const encrypter = new Encrypter(new Argon2Strategy())
```

### 3. **Observer Pattern - Sugerido**

**Proposta**: Para notificações quando animais são adotados.

```typescript
export interface AnimalAdoptionObserver {
  onAnimalAdopted(animal: Animal, adopter: User): void
}

export class EmailNotificationObserver implements AnimalAdoptionObserver {
  onAnimalAdopted(animal: Animal, adopter: User): void {

  }
}

export class PushNotificationObserver implements AnimalAdoptionObserver {
  onAnimalAdopted(animal: Animal, adopter: User): void {
  }
}

export class AnimalAdoptionService {
  private observers: AnimalAdoptionObserver[] = []

  addObserver(observer: AnimalAdoptionObserver): void {
    this.observers.push(observer)
  }

  async adoptAnimal(animalId: string, adopterId: string): Promise<void> {
    
    this.observers.forEach(observer =>
      observer.onAnimalAdopted(animal, adopter)
    )
  }
}
```

## Resumo da Análise

| Princípio/Padrão | Status | Observações |
|------------------|--------|-------------|
| **SRP** | Aplicado | Classes bem responsabilizadas |
| **OCP** | Aplicado | Uso de interfaces permite extensão |
| **LSP** | Aplicado | Substituição de implementações funciona |
| **ISP** | Parcial | Interfaces poderiam ser mais segregadas |
| **DIP** | Aplicado | Dependência de abstrações |
| **Singleton** | Aplicado | Instâncias únicas de serviços |
| **Dependency Injection** | Aplicado | Injeção via construtor |
| **Repository** | Aplicado | Abstração de acesso a dados |
| **Either** | Aplicado | Tratamento funcional de erros |

## Recomendações

1. **Implementar Factory Pattern** para simplificar criação de serviços
2. **Aplicar Strategy Pattern** para algoritmos de criptografia
3. **Segregar interfaces** seguindo ISP mais rigorosamente
4. **Considerar Observer Pattern** para notificações
5. **Adicionar mais testes** para validar os padrões implementados

O projeto demonstra uma boa aplicação dos princípios SOLID e padrões de projeto, com arquitetura limpa e bem estruturada.
