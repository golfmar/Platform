
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model events
 * 
 */
export type events = $Result.DefaultSelection<Prisma.$eventsPayload>
/**
 * Model registrations
 * 
 */
export type registrations = $Result.DefaultSelection<Prisma.$registrationsPayload>
/**
 * Model spatial_ref_sys
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type spatial_ref_sys = $Result.DefaultSelection<Prisma.$spatial_ref_sysPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Events
 * const events = await prisma.events.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Events
   * const events = await prisma.events.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.events`: Exposes CRUD operations for the **events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.events.findMany()
    * ```
    */
  get events(): Prisma.eventsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registrations`: Exposes CRUD operations for the **registrations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registrations
    * const registrations = await prisma.registrations.findMany()
    * ```
    */
  get registrations(): Prisma.registrationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spatial_ref_sys`: Exposes CRUD operations for the **spatial_ref_sys** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spatial_ref_sys
    * const spatial_ref_sys = await prisma.spatial_ref_sys.findMany()
    * ```
    */
  get spatial_ref_sys(): Prisma.spatial_ref_sysDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    events: 'events',
    registrations: 'registrations',
    spatial_ref_sys: 'spatial_ref_sys',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "events" | "registrations" | "spatial_ref_sys" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      events: {
        payload: Prisma.$eventsPayload<ExtArgs>
        fields: Prisma.eventsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.eventsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.eventsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload>
          }
          findFirst: {
            args: Prisma.eventsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.eventsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload>
          }
          findMany: {
            args: Prisma.eventsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload>[]
          }
          delete: {
            args: Prisma.eventsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload>
          }
          update: {
            args: Prisma.eventsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload>
          }
          deleteMany: {
            args: Prisma.eventsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.eventsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.eventsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventsPayload>[]
          }
          aggregate: {
            args: Prisma.EventsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvents>
          }
          groupBy: {
            args: Prisma.eventsGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventsGroupByOutputType>[]
          }
          count: {
            args: Prisma.eventsCountArgs<ExtArgs>
            result: $Utils.Optional<EventsCountAggregateOutputType> | number
          }
        }
      }
      registrations: {
        payload: Prisma.$registrationsPayload<ExtArgs>
        fields: Prisma.registrationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.registrationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.registrationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          findFirst: {
            args: Prisma.registrationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.registrationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          findMany: {
            args: Prisma.registrationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>[]
          }
          create: {
            args: Prisma.registrationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          createMany: {
            args: Prisma.registrationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.registrationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>[]
          }
          delete: {
            args: Prisma.registrationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          update: {
            args: Prisma.registrationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          deleteMany: {
            args: Prisma.registrationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.registrationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.registrationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>[]
          }
          upsert: {
            args: Prisma.registrationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$registrationsPayload>
          }
          aggregate: {
            args: Prisma.RegistrationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistrations>
          }
          groupBy: {
            args: Prisma.registrationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.registrationsCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationsCountAggregateOutputType> | number
          }
        }
      }
      spatial_ref_sys: {
        payload: Prisma.$spatial_ref_sysPayload<ExtArgs>
        fields: Prisma.spatial_ref_sysFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spatial_ref_sysFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spatial_ref_sysFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          findFirst: {
            args: Prisma.spatial_ref_sysFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spatial_ref_sysFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          findMany: {
            args: Prisma.spatial_ref_sysFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>[]
          }
          create: {
            args: Prisma.spatial_ref_sysCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          createMany: {
            args: Prisma.spatial_ref_sysCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.spatial_ref_sysCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>[]
          }
          delete: {
            args: Prisma.spatial_ref_sysDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          update: {
            args: Prisma.spatial_ref_sysUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          deleteMany: {
            args: Prisma.spatial_ref_sysDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spatial_ref_sysUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.spatial_ref_sysUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>[]
          }
          upsert: {
            args: Prisma.spatial_ref_sysUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spatial_ref_sysPayload>
          }
          aggregate: {
            args: Prisma.Spatial_ref_sysAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpatial_ref_sys>
          }
          groupBy: {
            args: Prisma.spatial_ref_sysGroupByArgs<ExtArgs>
            result: $Utils.Optional<Spatial_ref_sysGroupByOutputType>[]
          }
          count: {
            args: Prisma.spatial_ref_sysCountArgs<ExtArgs>
            result: $Utils.Optional<Spatial_ref_sysCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    events?: eventsOmit
    registrations?: registrationsOmit
    spatial_ref_sys?: spatial_ref_sysOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EventsCountOutputType
   */

  export type EventsCountOutputType = {
    registrations: number
  }

  export type EventsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | EventsCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * EventsCountOutputType without action
   */
  export type EventsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventsCountOutputType
     */
    select?: EventsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventsCountOutputType without action
   */
  export type EventsCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrationsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    events: number
    registrations: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UsersCountOutputTypeCountEventsArgs
    registrations?: boolean | UsersCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: eventsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrationsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model events
   */

  export type AggregateEvents = {
    _count: EventsCountAggregateOutputType | null
    _avg: EventsAvgAggregateOutputType | null
    _sum: EventsSumAggregateOutputType | null
    _min: EventsMinAggregateOutputType | null
    _max: EventsMaxAggregateOutputType | null
  }

  export type EventsAvgAggregateOutputType = {
    id: number | null
    organizer_id: number | null
  }

  export type EventsSumAggregateOutputType = {
    id: number | null
    organizer_id: number | null
  }

  export type EventsMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    event_date: Date | null
    created_at: Date | null
    organizer_id: number | null
  }

  export type EventsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    event_date: Date | null
    created_at: Date | null
    organizer_id: number | null
  }

  export type EventsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    event_date: number
    created_at: number
    organizer_id: number
    _all: number
  }


  export type EventsAvgAggregateInputType = {
    id?: true
    organizer_id?: true
  }

  export type EventsSumAggregateInputType = {
    id?: true
    organizer_id?: true
  }

  export type EventsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    event_date?: true
    created_at?: true
    organizer_id?: true
  }

  export type EventsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    event_date?: true
    created_at?: true
    organizer_id?: true
  }

  export type EventsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    event_date?: true
    created_at?: true
    organizer_id?: true
    _all?: true
  }

  export type EventsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which events to aggregate.
     */
    where?: eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of events to fetch.
     */
    orderBy?: eventsOrderByWithRelationInput | eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned events
    **/
    _count?: true | EventsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventsMaxAggregateInputType
  }

  export type GetEventsAggregateType<T extends EventsAggregateArgs> = {
        [P in keyof T & keyof AggregateEvents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvents[P]>
      : GetScalarType<T[P], AggregateEvents[P]>
  }




  export type eventsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: eventsWhereInput
    orderBy?: eventsOrderByWithAggregationInput | eventsOrderByWithAggregationInput[]
    by: EventsScalarFieldEnum[] | EventsScalarFieldEnum
    having?: eventsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventsCountAggregateInputType | true
    _avg?: EventsAvgAggregateInputType
    _sum?: EventsSumAggregateInputType
    _min?: EventsMinAggregateInputType
    _max?: EventsMaxAggregateInputType
  }

  export type EventsGroupByOutputType = {
    id: number
    title: string
    description: string | null
    event_date: Date
    created_at: Date | null
    organizer_id: number
    _count: EventsCountAggregateOutputType | null
    _avg: EventsAvgAggregateOutputType | null
    _sum: EventsSumAggregateOutputType | null
    _min: EventsMinAggregateOutputType | null
    _max: EventsMaxAggregateOutputType | null
  }

  type GetEventsGroupByPayload<T extends eventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventsGroupByOutputType[P]>
            : GetScalarType<T[P], EventsGroupByOutputType[P]>
        }
      >
    >


  export type eventsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    event_date?: boolean
    created_at?: boolean
    organizer_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    registrations?: boolean | events$registrationsArgs<ExtArgs>
    _count?: boolean | EventsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["events"]>


  export type eventsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    event_date?: boolean
    created_at?: boolean
    organizer_id?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["events"]>

  export type eventsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    event_date?: boolean
    created_at?: boolean
    organizer_id?: boolean
  }

  export type eventsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "event_date" | "created_at" | "organizer_id", ExtArgs["result"]["events"]>
  export type eventsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    registrations?: boolean | events$registrationsArgs<ExtArgs>
    _count?: boolean | EventsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type eventsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $eventsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "events"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      registrations: Prisma.$registrationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      event_date: Date
      created_at: Date | null
      organizer_id: number
    }, ExtArgs["result"]["events"]>
    composites: {}
  }

  type eventsGetPayload<S extends boolean | null | undefined | eventsDefaultArgs> = $Result.GetResult<Prisma.$eventsPayload, S>

  type eventsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<eventsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventsCountAggregateInputType | true
    }

  export interface eventsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['events'], meta: { name: 'events' } }
    /**
     * Find zero or one Events that matches the filter.
     * @param {eventsFindUniqueArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends eventsFindUniqueArgs>(args: SelectSubset<T, eventsFindUniqueArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Events that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {eventsFindUniqueOrThrowArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends eventsFindUniqueOrThrowArgs>(args: SelectSubset<T, eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventsFindFirstArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends eventsFindFirstArgs>(args?: SelectSubset<T, eventsFindFirstArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Events that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventsFindFirstOrThrowArgs} args - Arguments to find a Events
     * @example
     * // Get one Events
     * const events = await prisma.events.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends eventsFindFirstOrThrowArgs>(args?: SelectSubset<T, eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.events.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.events.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventsWithIdOnly = await prisma.events.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends eventsFindManyArgs>(args?: SelectSubset<T, eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a Events.
     * @param {eventsDeleteArgs} args - Arguments to delete one Events.
     * @example
     * // Delete one Events
     * const Events = await prisma.events.delete({
     *   where: {
     *     // ... filter to delete one Events
     *   }
     * })
     * 
     */
    delete<T extends eventsDeleteArgs>(args: SelectSubset<T, eventsDeleteArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Events.
     * @param {eventsUpdateArgs} args - Arguments to update one Events.
     * @example
     * // Update one Events
     * const events = await prisma.events.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends eventsUpdateArgs>(args: SelectSubset<T, eventsUpdateArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {eventsDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.events.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends eventsDeleteManyArgs>(args?: SelectSubset<T, eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const events = await prisma.events.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends eventsUpdateManyArgs>(args: SelectSubset<T, eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {eventsUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const events = await prisma.events.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventsWithIdOnly = await prisma.events.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends eventsUpdateManyAndReturnArgs>(args: SelectSubset<T, eventsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventsCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.events.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends eventsCountArgs>(
      args?: Subset<T, eventsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventsAggregateArgs>(args: Subset<T, EventsAggregateArgs>): Prisma.PrismaPromise<GetEventsAggregateType<T>>

    /**
     * Group by Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends eventsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: eventsGroupByArgs['orderBy'] }
        : { orderBy?: eventsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the events model
   */
  readonly fields: eventsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for events.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__eventsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    registrations<T extends events$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, events$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the events model
   */
  interface eventsFieldRefs {
    readonly id: FieldRef<"events", 'Int'>
    readonly title: FieldRef<"events", 'String'>
    readonly description: FieldRef<"events", 'String'>
    readonly event_date: FieldRef<"events", 'DateTime'>
    readonly created_at: FieldRef<"events", 'DateTime'>
    readonly organizer_id: FieldRef<"events", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * events findUnique
   */
  export type eventsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * Filter, which events to fetch.
     */
    where: eventsWhereUniqueInput
  }

  /**
   * events findUniqueOrThrow
   */
  export type eventsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * Filter, which events to fetch.
     */
    where: eventsWhereUniqueInput
  }

  /**
   * events findFirst
   */
  export type eventsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * Filter, which events to fetch.
     */
    where?: eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of events to fetch.
     */
    orderBy?: eventsOrderByWithRelationInput | eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for events.
     */
    cursor?: eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of events.
     */
    distinct?: EventsScalarFieldEnum | EventsScalarFieldEnum[]
  }

  /**
   * events findFirstOrThrow
   */
  export type eventsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * Filter, which events to fetch.
     */
    where?: eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of events to fetch.
     */
    orderBy?: eventsOrderByWithRelationInput | eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for events.
     */
    cursor?: eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of events.
     */
    distinct?: EventsScalarFieldEnum | EventsScalarFieldEnum[]
  }

  /**
   * events findMany
   */
  export type eventsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * Filter, which events to fetch.
     */
    where?: eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of events to fetch.
     */
    orderBy?: eventsOrderByWithRelationInput | eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing events.
     */
    cursor?: eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` events.
     */
    skip?: number
    distinct?: EventsScalarFieldEnum | EventsScalarFieldEnum[]
  }

  /**
   * events update
   */
  export type eventsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * The data needed to update a events.
     */
    data: XOR<eventsUpdateInput, eventsUncheckedUpdateInput>
    /**
     * Choose, which events to update.
     */
    where: eventsWhereUniqueInput
  }

  /**
   * events updateMany
   */
  export type eventsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update events.
     */
    data: XOR<eventsUpdateManyMutationInput, eventsUncheckedUpdateManyInput>
    /**
     * Filter which events to update
     */
    where?: eventsWhereInput
    /**
     * Limit how many events to update.
     */
    limit?: number
  }

  /**
   * events updateManyAndReturn
   */
  export type eventsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * The data used to update events.
     */
    data: XOR<eventsUpdateManyMutationInput, eventsUncheckedUpdateManyInput>
    /**
     * Filter which events to update
     */
    where?: eventsWhereInput
    /**
     * Limit how many events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * events delete
   */
  export type eventsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    /**
     * Filter which events to delete.
     */
    where: eventsWhereUniqueInput
  }

  /**
   * events deleteMany
   */
  export type eventsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which events to delete
     */
    where?: eventsWhereInput
    /**
     * Limit how many events to delete.
     */
    limit?: number
  }

  /**
   * events.registrations
   */
  export type events$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    where?: registrationsWhereInput
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    cursor?: registrationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * events without action
   */
  export type eventsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
  }


  /**
   * Model registrations
   */

  export type AggregateRegistrations = {
    _count: RegistrationsCountAggregateOutputType | null
    _avg: RegistrationsAvgAggregateOutputType | null
    _sum: RegistrationsSumAggregateOutputType | null
    _min: RegistrationsMinAggregateOutputType | null
    _max: RegistrationsMaxAggregateOutputType | null
  }

  export type RegistrationsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
  }

  export type RegistrationsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
  }

  export type RegistrationsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
    registered_at: Date | null
  }

  export type RegistrationsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    event_id: number | null
    registered_at: Date | null
  }

  export type RegistrationsCountAggregateOutputType = {
    id: number
    user_id: number
    event_id: number
    registered_at: number
    _all: number
  }


  export type RegistrationsAvgAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
  }

  export type RegistrationsSumAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
  }

  export type RegistrationsMinAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    registered_at?: true
  }

  export type RegistrationsMaxAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    registered_at?: true
  }

  export type RegistrationsCountAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    registered_at?: true
    _all?: true
  }

  export type RegistrationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which registrations to aggregate.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned registrations
    **/
    _count?: true | RegistrationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistrationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistrationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationsMaxAggregateInputType
  }

  export type GetRegistrationsAggregateType<T extends RegistrationsAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistrations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistrations[P]>
      : GetScalarType<T[P], AggregateRegistrations[P]>
  }




  export type registrationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: registrationsWhereInput
    orderBy?: registrationsOrderByWithAggregationInput | registrationsOrderByWithAggregationInput[]
    by: RegistrationsScalarFieldEnum[] | RegistrationsScalarFieldEnum
    having?: registrationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationsCountAggregateInputType | true
    _avg?: RegistrationsAvgAggregateInputType
    _sum?: RegistrationsSumAggregateInputType
    _min?: RegistrationsMinAggregateInputType
    _max?: RegistrationsMaxAggregateInputType
  }

  export type RegistrationsGroupByOutputType = {
    id: number
    user_id: number
    event_id: number
    registered_at: Date | null
    _count: RegistrationsCountAggregateOutputType | null
    _avg: RegistrationsAvgAggregateOutputType | null
    _sum: RegistrationsSumAggregateOutputType | null
    _min: RegistrationsMinAggregateOutputType | null
    _max: RegistrationsMaxAggregateOutputType | null
  }

  type GetRegistrationsGroupByPayload<T extends registrationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationsGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationsGroupByOutputType[P]>
        }
      >
    >


  export type registrationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    registered_at?: boolean
    events?: boolean | eventsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registrations"]>

  export type registrationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    registered_at?: boolean
    events?: boolean | eventsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registrations"]>

  export type registrationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    registered_at?: boolean
    events?: boolean | eventsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registrations"]>

  export type registrationsSelectScalar = {
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    registered_at?: boolean
  }

  export type registrationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "event_id" | "registered_at", ExtArgs["result"]["registrations"]>
  export type registrationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | eventsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type registrationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | eventsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type registrationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | eventsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $registrationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "registrations"
    objects: {
      events: Prisma.$eventsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      event_id: number
      registered_at: Date | null
    }, ExtArgs["result"]["registrations"]>
    composites: {}
  }

  type registrationsGetPayload<S extends boolean | null | undefined | registrationsDefaultArgs> = $Result.GetResult<Prisma.$registrationsPayload, S>

  type registrationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<registrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationsCountAggregateInputType | true
    }

  export interface registrationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['registrations'], meta: { name: 'registrations' } }
    /**
     * Find zero or one Registrations that matches the filter.
     * @param {registrationsFindUniqueArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends registrationsFindUniqueArgs>(args: SelectSubset<T, registrationsFindUniqueArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registrations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {registrationsFindUniqueOrThrowArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends registrationsFindUniqueOrThrowArgs>(args: SelectSubset<T, registrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsFindFirstArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends registrationsFindFirstArgs>(args?: SelectSubset<T, registrationsFindFirstArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registrations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsFindFirstOrThrowArgs} args - Arguments to find a Registrations
     * @example
     * // Get one Registrations
     * const registrations = await prisma.registrations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends registrationsFindFirstOrThrowArgs>(args?: SelectSubset<T, registrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registrations
     * const registrations = await prisma.registrations.findMany()
     * 
     * // Get first 10 Registrations
     * const registrations = await prisma.registrations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationsWithIdOnly = await prisma.registrations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends registrationsFindManyArgs>(args?: SelectSubset<T, registrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registrations.
     * @param {registrationsCreateArgs} args - Arguments to create a Registrations.
     * @example
     * // Create one Registrations
     * const Registrations = await prisma.registrations.create({
     *   data: {
     *     // ... data to create a Registrations
     *   }
     * })
     * 
     */
    create<T extends registrationsCreateArgs>(args: SelectSubset<T, registrationsCreateArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registrations.
     * @param {registrationsCreateManyArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registrations = await prisma.registrations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends registrationsCreateManyArgs>(args?: SelectSubset<T, registrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Registrations and returns the data saved in the database.
     * @param {registrationsCreateManyAndReturnArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registrations = await prisma.registrations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Registrations and only return the `id`
     * const registrationsWithIdOnly = await prisma.registrations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends registrationsCreateManyAndReturnArgs>(args?: SelectSubset<T, registrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Registrations.
     * @param {registrationsDeleteArgs} args - Arguments to delete one Registrations.
     * @example
     * // Delete one Registrations
     * const Registrations = await prisma.registrations.delete({
     *   where: {
     *     // ... filter to delete one Registrations
     *   }
     * })
     * 
     */
    delete<T extends registrationsDeleteArgs>(args: SelectSubset<T, registrationsDeleteArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registrations.
     * @param {registrationsUpdateArgs} args - Arguments to update one Registrations.
     * @example
     * // Update one Registrations
     * const registrations = await prisma.registrations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends registrationsUpdateArgs>(args: SelectSubset<T, registrationsUpdateArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registrations.
     * @param {registrationsDeleteManyArgs} args - Arguments to filter Registrations to delete.
     * @example
     * // Delete a few Registrations
     * const { count } = await prisma.registrations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends registrationsDeleteManyArgs>(args?: SelectSubset<T, registrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registrations
     * const registrations = await prisma.registrations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends registrationsUpdateManyArgs>(args: SelectSubset<T, registrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations and returns the data updated in the database.
     * @param {registrationsUpdateManyAndReturnArgs} args - Arguments to update many Registrations.
     * @example
     * // Update many Registrations
     * const registrations = await prisma.registrations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Registrations and only return the `id`
     * const registrationsWithIdOnly = await prisma.registrations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends registrationsUpdateManyAndReturnArgs>(args: SelectSubset<T, registrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Registrations.
     * @param {registrationsUpsertArgs} args - Arguments to update or create a Registrations.
     * @example
     * // Update or create a Registrations
     * const registrations = await prisma.registrations.upsert({
     *   create: {
     *     // ... data to create a Registrations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registrations we want to update
     *   }
     * })
     */
    upsert<T extends registrationsUpsertArgs>(args: SelectSubset<T, registrationsUpsertArgs<ExtArgs>>): Prisma__registrationsClient<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsCountArgs} args - Arguments to filter Registrations to count.
     * @example
     * // Count the number of Registrations
     * const count = await prisma.registrations.count({
     *   where: {
     *     // ... the filter for the Registrations we want to count
     *   }
     * })
    **/
    count<T extends registrationsCountArgs>(
      args?: Subset<T, registrationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationsAggregateArgs>(args: Subset<T, RegistrationsAggregateArgs>): Prisma.PrismaPromise<GetRegistrationsAggregateType<T>>

    /**
     * Group by Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {registrationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends registrationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: registrationsGroupByArgs['orderBy'] }
        : { orderBy?: registrationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, registrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the registrations model
   */
  readonly fields: registrationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for registrations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__registrationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends eventsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, eventsDefaultArgs<ExtArgs>>): Prisma__eventsClient<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the registrations model
   */
  interface registrationsFieldRefs {
    readonly id: FieldRef<"registrations", 'Int'>
    readonly user_id: FieldRef<"registrations", 'Int'>
    readonly event_id: FieldRef<"registrations", 'Int'>
    readonly registered_at: FieldRef<"registrations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * registrations findUnique
   */
  export type registrationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations findUniqueOrThrow
   */
  export type registrationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations findFirst
   */
  export type registrationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for registrations.
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of registrations.
     */
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * registrations findFirstOrThrow
   */
  export type registrationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for registrations.
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of registrations.
     */
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * registrations findMany
   */
  export type registrationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * Filter, which registrations to fetch.
     */
    where?: registrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of registrations to fetch.
     */
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing registrations.
     */
    cursor?: registrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` registrations.
     */
    skip?: number
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * registrations create
   */
  export type registrationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * The data needed to create a registrations.
     */
    data: XOR<registrationsCreateInput, registrationsUncheckedCreateInput>
  }

  /**
   * registrations createMany
   */
  export type registrationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many registrations.
     */
    data: registrationsCreateManyInput | registrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * registrations createManyAndReturn
   */
  export type registrationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The data used to create many registrations.
     */
    data: registrationsCreateManyInput | registrationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * registrations update
   */
  export type registrationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * The data needed to update a registrations.
     */
    data: XOR<registrationsUpdateInput, registrationsUncheckedUpdateInput>
    /**
     * Choose, which registrations to update.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations updateMany
   */
  export type registrationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update registrations.
     */
    data: XOR<registrationsUpdateManyMutationInput, registrationsUncheckedUpdateManyInput>
    /**
     * Filter which registrations to update
     */
    where?: registrationsWhereInput
    /**
     * Limit how many registrations to update.
     */
    limit?: number
  }

  /**
   * registrations updateManyAndReturn
   */
  export type registrationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * The data used to update registrations.
     */
    data: XOR<registrationsUpdateManyMutationInput, registrationsUncheckedUpdateManyInput>
    /**
     * Filter which registrations to update
     */
    where?: registrationsWhereInput
    /**
     * Limit how many registrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * registrations upsert
   */
  export type registrationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * The filter to search for the registrations to update in case it exists.
     */
    where: registrationsWhereUniqueInput
    /**
     * In case the registrations found by the `where` argument doesn't exist, create a new registrations with this data.
     */
    create: XOR<registrationsCreateInput, registrationsUncheckedCreateInput>
    /**
     * In case the registrations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<registrationsUpdateInput, registrationsUncheckedUpdateInput>
  }

  /**
   * registrations delete
   */
  export type registrationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    /**
     * Filter which registrations to delete.
     */
    where: registrationsWhereUniqueInput
  }

  /**
   * registrations deleteMany
   */
  export type registrationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which registrations to delete
     */
    where?: registrationsWhereInput
    /**
     * Limit how many registrations to delete.
     */
    limit?: number
  }

  /**
   * registrations without action
   */
  export type registrationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
  }


  /**
   * Model spatial_ref_sys
   */

  export type AggregateSpatial_ref_sys = {
    _count: Spatial_ref_sysCountAggregateOutputType | null
    _avg: Spatial_ref_sysAvgAggregateOutputType | null
    _sum: Spatial_ref_sysSumAggregateOutputType | null
    _min: Spatial_ref_sysMinAggregateOutputType | null
    _max: Spatial_ref_sysMaxAggregateOutputType | null
  }

  export type Spatial_ref_sysAvgAggregateOutputType = {
    srid: number | null
    auth_srid: number | null
  }

  export type Spatial_ref_sysSumAggregateOutputType = {
    srid: number | null
    auth_srid: number | null
  }

  export type Spatial_ref_sysMinAggregateOutputType = {
    srid: number | null
    auth_name: string | null
    auth_srid: number | null
    srtext: string | null
    proj4text: string | null
  }

  export type Spatial_ref_sysMaxAggregateOutputType = {
    srid: number | null
    auth_name: string | null
    auth_srid: number | null
    srtext: string | null
    proj4text: string | null
  }

  export type Spatial_ref_sysCountAggregateOutputType = {
    srid: number
    auth_name: number
    auth_srid: number
    srtext: number
    proj4text: number
    _all: number
  }


  export type Spatial_ref_sysAvgAggregateInputType = {
    srid?: true
    auth_srid?: true
  }

  export type Spatial_ref_sysSumAggregateInputType = {
    srid?: true
    auth_srid?: true
  }

  export type Spatial_ref_sysMinAggregateInputType = {
    srid?: true
    auth_name?: true
    auth_srid?: true
    srtext?: true
    proj4text?: true
  }

  export type Spatial_ref_sysMaxAggregateInputType = {
    srid?: true
    auth_name?: true
    auth_srid?: true
    srtext?: true
    proj4text?: true
  }

  export type Spatial_ref_sysCountAggregateInputType = {
    srid?: true
    auth_name?: true
    auth_srid?: true
    srtext?: true
    proj4text?: true
    _all?: true
  }

  export type Spatial_ref_sysAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spatial_ref_sys to aggregate.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spatial_ref_sys
    **/
    _count?: true | Spatial_ref_sysCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Spatial_ref_sysAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Spatial_ref_sysSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Spatial_ref_sysMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Spatial_ref_sysMaxAggregateInputType
  }

  export type GetSpatial_ref_sysAggregateType<T extends Spatial_ref_sysAggregateArgs> = {
        [P in keyof T & keyof AggregateSpatial_ref_sys]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpatial_ref_sys[P]>
      : GetScalarType<T[P], AggregateSpatial_ref_sys[P]>
  }




  export type spatial_ref_sysGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spatial_ref_sysWhereInput
    orderBy?: spatial_ref_sysOrderByWithAggregationInput | spatial_ref_sysOrderByWithAggregationInput[]
    by: Spatial_ref_sysScalarFieldEnum[] | Spatial_ref_sysScalarFieldEnum
    having?: spatial_ref_sysScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Spatial_ref_sysCountAggregateInputType | true
    _avg?: Spatial_ref_sysAvgAggregateInputType
    _sum?: Spatial_ref_sysSumAggregateInputType
    _min?: Spatial_ref_sysMinAggregateInputType
    _max?: Spatial_ref_sysMaxAggregateInputType
  }

  export type Spatial_ref_sysGroupByOutputType = {
    srid: number
    auth_name: string | null
    auth_srid: number | null
    srtext: string | null
    proj4text: string | null
    _count: Spatial_ref_sysCountAggregateOutputType | null
    _avg: Spatial_ref_sysAvgAggregateOutputType | null
    _sum: Spatial_ref_sysSumAggregateOutputType | null
    _min: Spatial_ref_sysMinAggregateOutputType | null
    _max: Spatial_ref_sysMaxAggregateOutputType | null
  }

  type GetSpatial_ref_sysGroupByPayload<T extends spatial_ref_sysGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Spatial_ref_sysGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Spatial_ref_sysGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Spatial_ref_sysGroupByOutputType[P]>
            : GetScalarType<T[P], Spatial_ref_sysGroupByOutputType[P]>
        }
      >
    >


  export type spatial_ref_sysSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }, ExtArgs["result"]["spatial_ref_sys"]>

  export type spatial_ref_sysSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }, ExtArgs["result"]["spatial_ref_sys"]>

  export type spatial_ref_sysSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }, ExtArgs["result"]["spatial_ref_sys"]>

  export type spatial_ref_sysSelectScalar = {
    srid?: boolean
    auth_name?: boolean
    auth_srid?: boolean
    srtext?: boolean
    proj4text?: boolean
  }

  export type spatial_ref_sysOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"srid" | "auth_name" | "auth_srid" | "srtext" | "proj4text", ExtArgs["result"]["spatial_ref_sys"]>

  export type $spatial_ref_sysPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spatial_ref_sys"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      srid: number
      auth_name: string | null
      auth_srid: number | null
      srtext: string | null
      proj4text: string | null
    }, ExtArgs["result"]["spatial_ref_sys"]>
    composites: {}
  }

  type spatial_ref_sysGetPayload<S extends boolean | null | undefined | spatial_ref_sysDefaultArgs> = $Result.GetResult<Prisma.$spatial_ref_sysPayload, S>

  type spatial_ref_sysCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<spatial_ref_sysFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Spatial_ref_sysCountAggregateInputType | true
    }

  export interface spatial_ref_sysDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spatial_ref_sys'], meta: { name: 'spatial_ref_sys' } }
    /**
     * Find zero or one Spatial_ref_sys that matches the filter.
     * @param {spatial_ref_sysFindUniqueArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spatial_ref_sysFindUniqueArgs>(args: SelectSubset<T, spatial_ref_sysFindUniqueArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spatial_ref_sys that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {spatial_ref_sysFindUniqueOrThrowArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spatial_ref_sysFindUniqueOrThrowArgs>(args: SelectSubset<T, spatial_ref_sysFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spatial_ref_sys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysFindFirstArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spatial_ref_sysFindFirstArgs>(args?: SelectSubset<T, spatial_ref_sysFindFirstArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spatial_ref_sys that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysFindFirstOrThrowArgs} args - Arguments to find a Spatial_ref_sys
     * @example
     * // Get one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spatial_ref_sysFindFirstOrThrowArgs>(args?: SelectSubset<T, spatial_ref_sysFindFirstOrThrowArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spatial_ref_sys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findMany()
     * 
     * // Get first 10 Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.findMany({ take: 10 })
     * 
     * // Only select the `srid`
     * const spatial_ref_sysWithSridOnly = await prisma.spatial_ref_sys.findMany({ select: { srid: true } })
     * 
     */
    findMany<T extends spatial_ref_sysFindManyArgs>(args?: SelectSubset<T, spatial_ref_sysFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spatial_ref_sys.
     * @param {spatial_ref_sysCreateArgs} args - Arguments to create a Spatial_ref_sys.
     * @example
     * // Create one Spatial_ref_sys
     * const Spatial_ref_sys = await prisma.spatial_ref_sys.create({
     *   data: {
     *     // ... data to create a Spatial_ref_sys
     *   }
     * })
     * 
     */
    create<T extends spatial_ref_sysCreateArgs>(args: SelectSubset<T, spatial_ref_sysCreateArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spatial_ref_sys.
     * @param {spatial_ref_sysCreateManyArgs} args - Arguments to create many Spatial_ref_sys.
     * @example
     * // Create many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spatial_ref_sysCreateManyArgs>(args?: SelectSubset<T, spatial_ref_sysCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spatial_ref_sys and returns the data saved in the database.
     * @param {spatial_ref_sysCreateManyAndReturnArgs} args - Arguments to create many Spatial_ref_sys.
     * @example
     * // Create many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spatial_ref_sys and only return the `srid`
     * const spatial_ref_sysWithSridOnly = await prisma.spatial_ref_sys.createManyAndReturn({
     *   select: { srid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends spatial_ref_sysCreateManyAndReturnArgs>(args?: SelectSubset<T, spatial_ref_sysCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spatial_ref_sys.
     * @param {spatial_ref_sysDeleteArgs} args - Arguments to delete one Spatial_ref_sys.
     * @example
     * // Delete one Spatial_ref_sys
     * const Spatial_ref_sys = await prisma.spatial_ref_sys.delete({
     *   where: {
     *     // ... filter to delete one Spatial_ref_sys
     *   }
     * })
     * 
     */
    delete<T extends spatial_ref_sysDeleteArgs>(args: SelectSubset<T, spatial_ref_sysDeleteArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spatial_ref_sys.
     * @param {spatial_ref_sysUpdateArgs} args - Arguments to update one Spatial_ref_sys.
     * @example
     * // Update one Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spatial_ref_sysUpdateArgs>(args: SelectSubset<T, spatial_ref_sysUpdateArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spatial_ref_sys.
     * @param {spatial_ref_sysDeleteManyArgs} args - Arguments to filter Spatial_ref_sys to delete.
     * @example
     * // Delete a few Spatial_ref_sys
     * const { count } = await prisma.spatial_ref_sys.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spatial_ref_sysDeleteManyArgs>(args?: SelectSubset<T, spatial_ref_sysDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spatial_ref_sysUpdateManyArgs>(args: SelectSubset<T, spatial_ref_sysUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spatial_ref_sys and returns the data updated in the database.
     * @param {spatial_ref_sysUpdateManyAndReturnArgs} args - Arguments to update many Spatial_ref_sys.
     * @example
     * // Update many Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spatial_ref_sys and only return the `srid`
     * const spatial_ref_sysWithSridOnly = await prisma.spatial_ref_sys.updateManyAndReturn({
     *   select: { srid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends spatial_ref_sysUpdateManyAndReturnArgs>(args: SelectSubset<T, spatial_ref_sysUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spatial_ref_sys.
     * @param {spatial_ref_sysUpsertArgs} args - Arguments to update or create a Spatial_ref_sys.
     * @example
     * // Update or create a Spatial_ref_sys
     * const spatial_ref_sys = await prisma.spatial_ref_sys.upsert({
     *   create: {
     *     // ... data to create a Spatial_ref_sys
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spatial_ref_sys we want to update
     *   }
     * })
     */
    upsert<T extends spatial_ref_sysUpsertArgs>(args: SelectSubset<T, spatial_ref_sysUpsertArgs<ExtArgs>>): Prisma__spatial_ref_sysClient<$Result.GetResult<Prisma.$spatial_ref_sysPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysCountArgs} args - Arguments to filter Spatial_ref_sys to count.
     * @example
     * // Count the number of Spatial_ref_sys
     * const count = await prisma.spatial_ref_sys.count({
     *   where: {
     *     // ... the filter for the Spatial_ref_sys we want to count
     *   }
     * })
    **/
    count<T extends spatial_ref_sysCountArgs>(
      args?: Subset<T, spatial_ref_sysCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Spatial_ref_sysCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Spatial_ref_sysAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Spatial_ref_sysAggregateArgs>(args: Subset<T, Spatial_ref_sysAggregateArgs>): Prisma.PrismaPromise<GetSpatial_ref_sysAggregateType<T>>

    /**
     * Group by Spatial_ref_sys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spatial_ref_sysGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spatial_ref_sysGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spatial_ref_sysGroupByArgs['orderBy'] }
        : { orderBy?: spatial_ref_sysGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spatial_ref_sysGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpatial_ref_sysGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spatial_ref_sys model
   */
  readonly fields: spatial_ref_sysFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spatial_ref_sys.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spatial_ref_sysClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spatial_ref_sys model
   */
  interface spatial_ref_sysFieldRefs {
    readonly srid: FieldRef<"spatial_ref_sys", 'Int'>
    readonly auth_name: FieldRef<"spatial_ref_sys", 'String'>
    readonly auth_srid: FieldRef<"spatial_ref_sys", 'Int'>
    readonly srtext: FieldRef<"spatial_ref_sys", 'String'>
    readonly proj4text: FieldRef<"spatial_ref_sys", 'String'>
  }
    

  // Custom InputTypes
  /**
   * spatial_ref_sys findUnique
   */
  export type spatial_ref_sysFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys findUniqueOrThrow
   */
  export type spatial_ref_sysFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys findFirst
   */
  export type spatial_ref_sysFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spatial_ref_sys.
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spatial_ref_sys.
     */
    distinct?: Spatial_ref_sysScalarFieldEnum | Spatial_ref_sysScalarFieldEnum[]
  }

  /**
   * spatial_ref_sys findFirstOrThrow
   */
  export type spatial_ref_sysFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spatial_ref_sys.
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spatial_ref_sys.
     */
    distinct?: Spatial_ref_sysScalarFieldEnum | Spatial_ref_sysScalarFieldEnum[]
  }

  /**
   * spatial_ref_sys findMany
   */
  export type spatial_ref_sysFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter, which spatial_ref_sys to fetch.
     */
    where?: spatial_ref_sysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spatial_ref_sys to fetch.
     */
    orderBy?: spatial_ref_sysOrderByWithRelationInput | spatial_ref_sysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spatial_ref_sys.
     */
    cursor?: spatial_ref_sysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spatial_ref_sys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spatial_ref_sys.
     */
    skip?: number
    distinct?: Spatial_ref_sysScalarFieldEnum | Spatial_ref_sysScalarFieldEnum[]
  }

  /**
   * spatial_ref_sys create
   */
  export type spatial_ref_sysCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data needed to create a spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysCreateInput, spatial_ref_sysUncheckedCreateInput>
  }

  /**
   * spatial_ref_sys createMany
   */
  export type spatial_ref_sysCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spatial_ref_sys.
     */
    data: spatial_ref_sysCreateManyInput | spatial_ref_sysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spatial_ref_sys createManyAndReturn
   */
  export type spatial_ref_sysCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data used to create many spatial_ref_sys.
     */
    data: spatial_ref_sysCreateManyInput | spatial_ref_sysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spatial_ref_sys update
   */
  export type spatial_ref_sysUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data needed to update a spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysUpdateInput, spatial_ref_sysUncheckedUpdateInput>
    /**
     * Choose, which spatial_ref_sys to update.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys updateMany
   */
  export type spatial_ref_sysUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysUpdateManyMutationInput, spatial_ref_sysUncheckedUpdateManyInput>
    /**
     * Filter which spatial_ref_sys to update
     */
    where?: spatial_ref_sysWhereInput
    /**
     * Limit how many spatial_ref_sys to update.
     */
    limit?: number
  }

  /**
   * spatial_ref_sys updateManyAndReturn
   */
  export type spatial_ref_sysUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The data used to update spatial_ref_sys.
     */
    data: XOR<spatial_ref_sysUpdateManyMutationInput, spatial_ref_sysUncheckedUpdateManyInput>
    /**
     * Filter which spatial_ref_sys to update
     */
    where?: spatial_ref_sysWhereInput
    /**
     * Limit how many spatial_ref_sys to update.
     */
    limit?: number
  }

  /**
   * spatial_ref_sys upsert
   */
  export type spatial_ref_sysUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * The filter to search for the spatial_ref_sys to update in case it exists.
     */
    where: spatial_ref_sysWhereUniqueInput
    /**
     * In case the spatial_ref_sys found by the `where` argument doesn't exist, create a new spatial_ref_sys with this data.
     */
    create: XOR<spatial_ref_sysCreateInput, spatial_ref_sysUncheckedCreateInput>
    /**
     * In case the spatial_ref_sys was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spatial_ref_sysUpdateInput, spatial_ref_sysUncheckedUpdateInput>
  }

  /**
   * spatial_ref_sys delete
   */
  export type spatial_ref_sysDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
    /**
     * Filter which spatial_ref_sys to delete.
     */
    where: spatial_ref_sysWhereUniqueInput
  }

  /**
   * spatial_ref_sys deleteMany
   */
  export type spatial_ref_sysDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spatial_ref_sys to delete
     */
    where?: spatial_ref_sysWhereInput
    /**
     * Limit how many spatial_ref_sys to delete.
     */
    limit?: number
  }

  /**
   * spatial_ref_sys without action
   */
  export type spatial_ref_sysDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spatial_ref_sys
     */
    select?: spatial_ref_sysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the spatial_ref_sys
     */
    omit?: spatial_ref_sysOmit<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password_hash: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password_hash: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password_hash: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    username: string
    email: string
    password_hash: string
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
    events?: boolean | users$eventsArgs<ExtArgs>
    registrations?: boolean | users$registrationsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password_hash" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | users$eventsArgs<ExtArgs>
    registrations?: boolean | users$registrationsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      events: Prisma.$eventsPayload<ExtArgs>[]
      registrations: Prisma.$registrationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password_hash: string
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends users$eventsArgs<ExtArgs> = {}>(args?: Subset<T, users$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrations<T extends users$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, users$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$registrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.events
   */
  export type users$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the events
     */
    select?: eventsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the events
     */
    omit?: eventsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: eventsInclude<ExtArgs> | null
    where?: eventsWhereInput
    orderBy?: eventsOrderByWithRelationInput | eventsOrderByWithRelationInput[]
    cursor?: eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventsScalarFieldEnum | EventsScalarFieldEnum[]
  }

  /**
   * users.registrations
   */
  export type users$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the registrations
     */
    select?: registrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the registrations
     */
    omit?: registrationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: registrationsInclude<ExtArgs> | null
    where?: registrationsWhereInput
    orderBy?: registrationsOrderByWithRelationInput | registrationsOrderByWithRelationInput[]
    cursor?: registrationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegistrationsScalarFieldEnum | RegistrationsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EventsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    event_date: 'event_date',
    created_at: 'created_at',
    organizer_id: 'organizer_id'
  };

  export type EventsScalarFieldEnum = (typeof EventsScalarFieldEnum)[keyof typeof EventsScalarFieldEnum]


  export const RegistrationsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    event_id: 'event_id',
    registered_at: 'registered_at'
  };

  export type RegistrationsScalarFieldEnum = (typeof RegistrationsScalarFieldEnum)[keyof typeof RegistrationsScalarFieldEnum]


  export const Spatial_ref_sysScalarFieldEnum: {
    srid: 'srid',
    auth_name: 'auth_name',
    auth_srid: 'auth_srid',
    srtext: 'srtext',
    proj4text: 'proj4text'
  };

  export type Spatial_ref_sysScalarFieldEnum = (typeof Spatial_ref_sysScalarFieldEnum)[keyof typeof Spatial_ref_sysScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type eventsWhereInput = {
    AND?: eventsWhereInput | eventsWhereInput[]
    OR?: eventsWhereInput[]
    NOT?: eventsWhereInput | eventsWhereInput[]
    id?: IntFilter<"events"> | number
    title?: StringFilter<"events"> | string
    description?: StringNullableFilter<"events"> | string | null
    event_date?: DateTimeFilter<"events"> | Date | string
    created_at?: DateTimeNullableFilter<"events"> | Date | string | null
    organizer_id?: IntFilter<"events"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    registrations?: RegistrationsListRelationFilter
  }

  export type eventsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    event_date?: SortOrder
    created_at?: SortOrderInput | SortOrder
    organizer_id?: SortOrder
    users?: usersOrderByWithRelationInput
    registrations?: registrationsOrderByRelationAggregateInput
  }

  export type eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: eventsWhereInput | eventsWhereInput[]
    OR?: eventsWhereInput[]
    NOT?: eventsWhereInput | eventsWhereInput[]
    title?: StringFilter<"events"> | string
    description?: StringNullableFilter<"events"> | string | null
    event_date?: DateTimeFilter<"events"> | Date | string
    created_at?: DateTimeNullableFilter<"events"> | Date | string | null
    organizer_id?: IntFilter<"events"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    registrations?: RegistrationsListRelationFilter
  }, "id">

  export type eventsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    event_date?: SortOrder
    created_at?: SortOrderInput | SortOrder
    organizer_id?: SortOrder
    _count?: eventsCountOrderByAggregateInput
    _avg?: eventsAvgOrderByAggregateInput
    _max?: eventsMaxOrderByAggregateInput
    _min?: eventsMinOrderByAggregateInput
    _sum?: eventsSumOrderByAggregateInput
  }

  export type eventsScalarWhereWithAggregatesInput = {
    AND?: eventsScalarWhereWithAggregatesInput | eventsScalarWhereWithAggregatesInput[]
    OR?: eventsScalarWhereWithAggregatesInput[]
    NOT?: eventsScalarWhereWithAggregatesInput | eventsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"events"> | number
    title?: StringWithAggregatesFilter<"events"> | string
    description?: StringNullableWithAggregatesFilter<"events"> | string | null
    event_date?: DateTimeWithAggregatesFilter<"events"> | Date | string
    created_at?: DateTimeNullableWithAggregatesFilter<"events"> | Date | string | null
    organizer_id?: IntWithAggregatesFilter<"events"> | number
  }

  export type registrationsWhereInput = {
    AND?: registrationsWhereInput | registrationsWhereInput[]
    OR?: registrationsWhereInput[]
    NOT?: registrationsWhereInput | registrationsWhereInput[]
    id?: IntFilter<"registrations"> | number
    user_id?: IntFilter<"registrations"> | number
    event_id?: IntFilter<"registrations"> | number
    registered_at?: DateTimeNullableFilter<"registrations"> | Date | string | null
    events?: XOR<EventsScalarRelationFilter, eventsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type registrationsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    registered_at?: SortOrderInput | SortOrder
    events?: eventsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type registrationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_event_id?: registrationsUser_idEvent_idCompoundUniqueInput
    AND?: registrationsWhereInput | registrationsWhereInput[]
    OR?: registrationsWhereInput[]
    NOT?: registrationsWhereInput | registrationsWhereInput[]
    user_id?: IntFilter<"registrations"> | number
    event_id?: IntFilter<"registrations"> | number
    registered_at?: DateTimeNullableFilter<"registrations"> | Date | string | null
    events?: XOR<EventsScalarRelationFilter, eventsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "user_id_event_id">

  export type registrationsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    registered_at?: SortOrderInput | SortOrder
    _count?: registrationsCountOrderByAggregateInput
    _avg?: registrationsAvgOrderByAggregateInput
    _max?: registrationsMaxOrderByAggregateInput
    _min?: registrationsMinOrderByAggregateInput
    _sum?: registrationsSumOrderByAggregateInput
  }

  export type registrationsScalarWhereWithAggregatesInput = {
    AND?: registrationsScalarWhereWithAggregatesInput | registrationsScalarWhereWithAggregatesInput[]
    OR?: registrationsScalarWhereWithAggregatesInput[]
    NOT?: registrationsScalarWhereWithAggregatesInput | registrationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"registrations"> | number
    user_id?: IntWithAggregatesFilter<"registrations"> | number
    event_id?: IntWithAggregatesFilter<"registrations"> | number
    registered_at?: DateTimeNullableWithAggregatesFilter<"registrations"> | Date | string | null
  }

  export type spatial_ref_sysWhereInput = {
    AND?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    OR?: spatial_ref_sysWhereInput[]
    NOT?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    srid?: IntFilter<"spatial_ref_sys"> | number
    auth_name?: StringNullableFilter<"spatial_ref_sys"> | string | null
    auth_srid?: IntNullableFilter<"spatial_ref_sys"> | number | null
    srtext?: StringNullableFilter<"spatial_ref_sys"> | string | null
    proj4text?: StringNullableFilter<"spatial_ref_sys"> | string | null
  }

  export type spatial_ref_sysOrderByWithRelationInput = {
    srid?: SortOrder
    auth_name?: SortOrderInput | SortOrder
    auth_srid?: SortOrderInput | SortOrder
    srtext?: SortOrderInput | SortOrder
    proj4text?: SortOrderInput | SortOrder
  }

  export type spatial_ref_sysWhereUniqueInput = Prisma.AtLeast<{
    srid?: number
    AND?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    OR?: spatial_ref_sysWhereInput[]
    NOT?: spatial_ref_sysWhereInput | spatial_ref_sysWhereInput[]
    auth_name?: StringNullableFilter<"spatial_ref_sys"> | string | null
    auth_srid?: IntNullableFilter<"spatial_ref_sys"> | number | null
    srtext?: StringNullableFilter<"spatial_ref_sys"> | string | null
    proj4text?: StringNullableFilter<"spatial_ref_sys"> | string | null
  }, "srid">

  export type spatial_ref_sysOrderByWithAggregationInput = {
    srid?: SortOrder
    auth_name?: SortOrderInput | SortOrder
    auth_srid?: SortOrderInput | SortOrder
    srtext?: SortOrderInput | SortOrder
    proj4text?: SortOrderInput | SortOrder
    _count?: spatial_ref_sysCountOrderByAggregateInput
    _avg?: spatial_ref_sysAvgOrderByAggregateInput
    _max?: spatial_ref_sysMaxOrderByAggregateInput
    _min?: spatial_ref_sysMinOrderByAggregateInput
    _sum?: spatial_ref_sysSumOrderByAggregateInput
  }

  export type spatial_ref_sysScalarWhereWithAggregatesInput = {
    AND?: spatial_ref_sysScalarWhereWithAggregatesInput | spatial_ref_sysScalarWhereWithAggregatesInput[]
    OR?: spatial_ref_sysScalarWhereWithAggregatesInput[]
    NOT?: spatial_ref_sysScalarWhereWithAggregatesInput | spatial_ref_sysScalarWhereWithAggregatesInput[]
    srid?: IntWithAggregatesFilter<"spatial_ref_sys"> | number
    auth_name?: StringNullableWithAggregatesFilter<"spatial_ref_sys"> | string | null
    auth_srid?: IntNullableWithAggregatesFilter<"spatial_ref_sys"> | number | null
    srtext?: StringNullableWithAggregatesFilter<"spatial_ref_sys"> | string | null
    proj4text?: StringNullableWithAggregatesFilter<"spatial_ref_sys"> | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    events?: EventsListRelationFilter
    registrations?: RegistrationsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrderInput | SortOrder
    events?: eventsOrderByRelationAggregateInput
    registrations?: registrationsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password_hash?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    events?: EventsListRelationFilter
    registrations?: RegistrationsListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type eventsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutEventsNestedInput
    registrations?: registrationsUpdateManyWithoutEventsNestedInput
  }

  export type eventsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizer_id?: IntFieldUpdateOperationsInput | number
    registrations?: registrationsUncheckedUpdateManyWithoutEventsNestedInput
  }

  export type eventsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type eventsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizer_id?: IntFieldUpdateOperationsInput | number
  }

  export type registrationsCreateInput = {
    registered_at?: Date | string | null
    events: eventsCreateNestedOneWithoutRegistrationsInput
    users: usersCreateNestedOneWithoutRegistrationsInput
  }

  export type registrationsUncheckedCreateInput = {
    id?: number
    user_id: number
    event_id: number
    registered_at?: Date | string | null
  }

  export type registrationsUpdateInput = {
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: eventsUpdateOneRequiredWithoutRegistrationsNestedInput
    users?: usersUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type registrationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrationsCreateManyInput = {
    id?: number
    user_id: number
    event_id: number
    registered_at?: Date | string | null
  }

  export type registrationsUpdateManyMutationInput = {
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type spatial_ref_sysCreateInput = {
    srid: number
    auth_name?: string | null
    auth_srid?: number | null
    srtext?: string | null
    proj4text?: string | null
  }

  export type spatial_ref_sysUncheckedCreateInput = {
    srid: number
    auth_name?: string | null
    auth_srid?: number | null
    srtext?: string | null
    proj4text?: string | null
  }

  export type spatial_ref_sysUpdateInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spatial_ref_sysUncheckedUpdateInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spatial_ref_sysCreateManyInput = {
    srid: number
    auth_name?: string | null
    auth_srid?: number | null
    srtext?: string | null
    proj4text?: string | null
  }

  export type spatial_ref_sysUpdateManyMutationInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type spatial_ref_sysUncheckedUpdateManyInput = {
    srid?: IntFieldUpdateOperationsInput | number
    auth_name?: NullableStringFieldUpdateOperationsInput | string | null
    auth_srid?: NullableIntFieldUpdateOperationsInput | number | null
    srtext?: NullableStringFieldUpdateOperationsInput | string | null
    proj4text?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateInput = {
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    events?: eventsCreateNestedManyWithoutUsersInput
    registrations?: registrationsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    events?: eventsUncheckedCreateNestedManyWithoutUsersInput
    registrations?: registrationsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: eventsUpdateManyWithoutUsersNestedInput
    registrations?: registrationsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: eventsUncheckedUpdateManyWithoutUsersNestedInput
    registrations?: registrationsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type RegistrationsListRelationFilter = {
    every?: registrationsWhereInput
    some?: registrationsWhereInput
    none?: registrationsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type registrationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type eventsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    event_date?: SortOrder
    created_at?: SortOrder
    organizer_id?: SortOrder
  }

  export type eventsAvgOrderByAggregateInput = {
    id?: SortOrder
    organizer_id?: SortOrder
  }

  export type eventsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    event_date?: SortOrder
    created_at?: SortOrder
    organizer_id?: SortOrder
  }

  export type eventsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    event_date?: SortOrder
    created_at?: SortOrder
    organizer_id?: SortOrder
  }

  export type eventsSumOrderByAggregateInput = {
    id?: SortOrder
    organizer_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EventsScalarRelationFilter = {
    is?: eventsWhereInput
    isNot?: eventsWhereInput
  }

  export type registrationsUser_idEvent_idCompoundUniqueInput = {
    user_id: number
    event_id: number
  }

  export type registrationsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    registered_at?: SortOrder
  }

  export type registrationsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
  }

  export type registrationsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    registered_at?: SortOrder
  }

  export type registrationsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    registered_at?: SortOrder
  }

  export type registrationsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type spatial_ref_sysCountOrderByAggregateInput = {
    srid?: SortOrder
    auth_name?: SortOrder
    auth_srid?: SortOrder
    srtext?: SortOrder
    proj4text?: SortOrder
  }

  export type spatial_ref_sysAvgOrderByAggregateInput = {
    srid?: SortOrder
    auth_srid?: SortOrder
  }

  export type spatial_ref_sysMaxOrderByAggregateInput = {
    srid?: SortOrder
    auth_name?: SortOrder
    auth_srid?: SortOrder
    srtext?: SortOrder
    proj4text?: SortOrder
  }

  export type spatial_ref_sysMinOrderByAggregateInput = {
    srid?: SortOrder
    auth_name?: SortOrder
    auth_srid?: SortOrder
    srtext?: SortOrder
    proj4text?: SortOrder
  }

  export type spatial_ref_sysSumOrderByAggregateInput = {
    srid?: SortOrder
    auth_srid?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EventsListRelationFilter = {
    every?: eventsWhereInput
    some?: eventsWhereInput
    none?: eventsWhereInput
  }

  export type eventsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<usersCreateWithoutEventsInput, usersUncheckedCreateWithoutEventsInput>
    connectOrCreate?: usersCreateOrConnectWithoutEventsInput
    upsert?: usersUpsertWithoutEventsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutEventsInput, usersUpdateWithoutEventsInput>, usersUncheckedUpdateWithoutEventsInput>
  }

  export type registrationsUpdateManyWithoutEventsNestedInput = {
    create?: XOR<registrationsCreateWithoutEventsInput, registrationsUncheckedCreateWithoutEventsInput> | registrationsCreateWithoutEventsInput[] | registrationsUncheckedCreateWithoutEventsInput[]
    connectOrCreate?: registrationsCreateOrConnectWithoutEventsInput | registrationsCreateOrConnectWithoutEventsInput[]
    upsert?: registrationsUpsertWithWhereUniqueWithoutEventsInput | registrationsUpsertWithWhereUniqueWithoutEventsInput[]
    createMany?: registrationsCreateManyEventsInputEnvelope
    set?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    disconnect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    delete?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    connect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    update?: registrationsUpdateWithWhereUniqueWithoutEventsInput | registrationsUpdateWithWhereUniqueWithoutEventsInput[]
    updateMany?: registrationsUpdateManyWithWhereWithoutEventsInput | registrationsUpdateManyWithWhereWithoutEventsInput[]
    deleteMany?: registrationsScalarWhereInput | registrationsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type registrationsUncheckedUpdateManyWithoutEventsNestedInput = {
    create?: XOR<registrationsCreateWithoutEventsInput, registrationsUncheckedCreateWithoutEventsInput> | registrationsCreateWithoutEventsInput[] | registrationsUncheckedCreateWithoutEventsInput[]
    connectOrCreate?: registrationsCreateOrConnectWithoutEventsInput | registrationsCreateOrConnectWithoutEventsInput[]
    upsert?: registrationsUpsertWithWhereUniqueWithoutEventsInput | registrationsUpsertWithWhereUniqueWithoutEventsInput[]
    createMany?: registrationsCreateManyEventsInputEnvelope
    set?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    disconnect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    delete?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    connect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    update?: registrationsUpdateWithWhereUniqueWithoutEventsInput | registrationsUpdateWithWhereUniqueWithoutEventsInput[]
    updateMany?: registrationsUpdateManyWithWhereWithoutEventsInput | registrationsUpdateManyWithWhereWithoutEventsInput[]
    deleteMany?: registrationsScalarWhereInput | registrationsScalarWhereInput[]
  }

  export type eventsCreateNestedOneWithoutRegistrationsInput = {
    connect?: eventsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<usersCreateWithoutRegistrationsInput, usersUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutRegistrationsInput
    connect?: usersWhereUniqueInput
  }

  export type eventsUpdateOneRequiredWithoutRegistrationsNestedInput = {
    connect?: eventsWhereUniqueInput
    update?: XOR<XOR<eventsUpdateToOneWithWhereWithoutRegistrationsInput, eventsUpdateWithoutRegistrationsInput>, eventsUncheckedUpdateWithoutRegistrationsInput>
  }

  export type usersUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<usersCreateWithoutRegistrationsInput, usersUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutRegistrationsInput
    upsert?: usersUpsertWithoutRegistrationsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutRegistrationsInput, usersUpdateWithoutRegistrationsInput>, usersUncheckedUpdateWithoutRegistrationsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type eventsCreateNestedManyWithoutUsersInput = {
    connect?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
  }

  export type registrationsCreateNestedManyWithoutUsersInput = {
    create?: XOR<registrationsCreateWithoutUsersInput, registrationsUncheckedCreateWithoutUsersInput> | registrationsCreateWithoutUsersInput[] | registrationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: registrationsCreateOrConnectWithoutUsersInput | registrationsCreateOrConnectWithoutUsersInput[]
    createMany?: registrationsCreateManyUsersInputEnvelope
    connect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
  }

  export type eventsUncheckedCreateNestedManyWithoutUsersInput = {
    connect?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
  }

  export type registrationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<registrationsCreateWithoutUsersInput, registrationsUncheckedCreateWithoutUsersInput> | registrationsCreateWithoutUsersInput[] | registrationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: registrationsCreateOrConnectWithoutUsersInput | registrationsCreateOrConnectWithoutUsersInput[]
    createMany?: registrationsCreateManyUsersInputEnvelope
    connect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
  }

  export type eventsUpdateManyWithoutUsersNestedInput = {
    set?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    disconnect?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    delete?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    connect?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    update?: eventsUpdateWithWhereUniqueWithoutUsersInput | eventsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: eventsUpdateManyWithWhereWithoutUsersInput | eventsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: eventsScalarWhereInput | eventsScalarWhereInput[]
  }

  export type registrationsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<registrationsCreateWithoutUsersInput, registrationsUncheckedCreateWithoutUsersInput> | registrationsCreateWithoutUsersInput[] | registrationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: registrationsCreateOrConnectWithoutUsersInput | registrationsCreateOrConnectWithoutUsersInput[]
    upsert?: registrationsUpsertWithWhereUniqueWithoutUsersInput | registrationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: registrationsCreateManyUsersInputEnvelope
    set?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    disconnect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    delete?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    connect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    update?: registrationsUpdateWithWhereUniqueWithoutUsersInput | registrationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: registrationsUpdateManyWithWhereWithoutUsersInput | registrationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: registrationsScalarWhereInput | registrationsScalarWhereInput[]
  }

  export type eventsUncheckedUpdateManyWithoutUsersNestedInput = {
    set?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    disconnect?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    delete?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    connect?: eventsWhereUniqueInput | eventsWhereUniqueInput[]
    update?: eventsUpdateWithWhereUniqueWithoutUsersInput | eventsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: eventsUpdateManyWithWhereWithoutUsersInput | eventsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: eventsScalarWhereInput | eventsScalarWhereInput[]
  }

  export type registrationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<registrationsCreateWithoutUsersInput, registrationsUncheckedCreateWithoutUsersInput> | registrationsCreateWithoutUsersInput[] | registrationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: registrationsCreateOrConnectWithoutUsersInput | registrationsCreateOrConnectWithoutUsersInput[]
    upsert?: registrationsUpsertWithWhereUniqueWithoutUsersInput | registrationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: registrationsCreateManyUsersInputEnvelope
    set?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    disconnect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    delete?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    connect?: registrationsWhereUniqueInput | registrationsWhereUniqueInput[]
    update?: registrationsUpdateWithWhereUniqueWithoutUsersInput | registrationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: registrationsUpdateManyWithWhereWithoutUsersInput | registrationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: registrationsScalarWhereInput | registrationsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type usersCreateWithoutEventsInput = {
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    registrations?: registrationsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutEventsInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    registrations?: registrationsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutEventsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutEventsInput, usersUncheckedCreateWithoutEventsInput>
  }

  export type usersUpsertWithoutEventsInput = {
    update: XOR<usersUpdateWithoutEventsInput, usersUncheckedUpdateWithoutEventsInput>
    create: XOR<usersCreateWithoutEventsInput, usersUncheckedCreateWithoutEventsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutEventsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutEventsInput, usersUncheckedUpdateWithoutEventsInput>
  }

  export type usersUpdateWithoutEventsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: registrationsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: registrationsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type registrationsCreateWithoutEventsInput = {
    registered_at?: Date | string | null
    users: usersCreateNestedOneWithoutRegistrationsInput
  }

  export type registrationsUncheckedCreateWithoutEventsInput = {
    id?: number
    user_id: number
    registered_at?: Date | string | null
  }

  export type registrationsCreateOrConnectWithoutEventsInput = {
    where: registrationsWhereUniqueInput
    create: XOR<registrationsCreateWithoutEventsInput, registrationsUncheckedCreateWithoutEventsInput>
  }

  export type registrationsUpsertWithWhereUniqueWithoutEventsInput = {
    where: registrationsWhereUniqueInput
    update: XOR<registrationsUpdateWithoutEventsInput, registrationsUncheckedUpdateWithoutEventsInput>
    create: XOR<registrationsCreateWithoutEventsInput, registrationsUncheckedCreateWithoutEventsInput>
  }

  export type registrationsCreateManyEventsInputEnvelope = {
    data: registrationsCreateManyEventsInput | registrationsCreateManyEventsInput[]
    skipDuplicates?: boolean
  }

  export type registrationsUpdateWithWhereUniqueWithoutEventsInput = {
    where: registrationsWhereUniqueInput
    data: XOR<registrationsUpdateWithoutEventsInput, registrationsUncheckedUpdateWithoutEventsInput>
  }

  export type registrationsUpdateManyWithWhereWithoutEventsInput = {
    where: registrationsScalarWhereInput
    data: XOR<registrationsUpdateManyMutationInput, registrationsUncheckedUpdateManyWithoutEventsInput>
  }

  export type registrationsScalarWhereInput = {
    AND?: registrationsScalarWhereInput | registrationsScalarWhereInput[]
    OR?: registrationsScalarWhereInput[]
    NOT?: registrationsScalarWhereInput | registrationsScalarWhereInput[]
    id?: IntFilter<"registrations"> | number
    user_id?: IntFilter<"registrations"> | number
    event_id?: IntFilter<"registrations"> | number
    registered_at?: DateTimeNullableFilter<"registrations"> | Date | string | null
  }

  export type usersCreateWithoutRegistrationsInput = {
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    events?: eventsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutRegistrationsInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    created_at?: Date | string | null
    events?: eventsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutRegistrationsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRegistrationsInput, usersUncheckedCreateWithoutRegistrationsInput>
  }

  export type eventsUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: eventsWhereInput
    data: XOR<eventsUpdateWithoutRegistrationsInput, eventsUncheckedUpdateWithoutRegistrationsInput>
  }

  export type eventsUpdateWithoutRegistrationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutEventsNestedInput
  }

  export type eventsUncheckedUpdateWithoutRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizer_id?: IntFieldUpdateOperationsInput | number
  }

  export type usersUpsertWithoutRegistrationsInput = {
    update: XOR<usersUpdateWithoutRegistrationsInput, usersUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<usersCreateWithoutRegistrationsInput, usersUncheckedCreateWithoutRegistrationsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutRegistrationsInput, usersUncheckedUpdateWithoutRegistrationsInput>
  }

  export type usersUpdateWithoutRegistrationsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: eventsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: eventsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type registrationsCreateWithoutUsersInput = {
    registered_at?: Date | string | null
    events: eventsCreateNestedOneWithoutRegistrationsInput
  }

  export type registrationsUncheckedCreateWithoutUsersInput = {
    id?: number
    event_id: number
    registered_at?: Date | string | null
  }

  export type registrationsCreateOrConnectWithoutUsersInput = {
    where: registrationsWhereUniqueInput
    create: XOR<registrationsCreateWithoutUsersInput, registrationsUncheckedCreateWithoutUsersInput>
  }

  export type registrationsCreateManyUsersInputEnvelope = {
    data: registrationsCreateManyUsersInput | registrationsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type eventsUpdateWithWhereUniqueWithoutUsersInput = {
    where: eventsWhereUniqueInput
    data: XOR<eventsUpdateWithoutUsersInput, eventsUncheckedUpdateWithoutUsersInput>
  }

  export type eventsUpdateManyWithWhereWithoutUsersInput = {
    where: eventsScalarWhereInput
    data: XOR<eventsUpdateManyMutationInput, eventsUncheckedUpdateManyWithoutUsersInput>
  }

  export type eventsScalarWhereInput = {
    AND?: eventsScalarWhereInput | eventsScalarWhereInput[]
    OR?: eventsScalarWhereInput[]
    NOT?: eventsScalarWhereInput | eventsScalarWhereInput[]
    id?: IntFilter<"events"> | number
    title?: StringFilter<"events"> | string
    description?: StringNullableFilter<"events"> | string | null
    event_date?: DateTimeFilter<"events"> | Date | string
    created_at?: DateTimeNullableFilter<"events"> | Date | string | null
    organizer_id?: IntFilter<"events"> | number
  }

  export type registrationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: registrationsWhereUniqueInput
    update: XOR<registrationsUpdateWithoutUsersInput, registrationsUncheckedUpdateWithoutUsersInput>
    create: XOR<registrationsCreateWithoutUsersInput, registrationsUncheckedCreateWithoutUsersInput>
  }

  export type registrationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: registrationsWhereUniqueInput
    data: XOR<registrationsUpdateWithoutUsersInput, registrationsUncheckedUpdateWithoutUsersInput>
  }

  export type registrationsUpdateManyWithWhereWithoutUsersInput = {
    where: registrationsScalarWhereInput
    data: XOR<registrationsUpdateManyMutationInput, registrationsUncheckedUpdateManyWithoutUsersInput>
  }

  export type registrationsUpdateWithoutEventsInput = {
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type registrationsUncheckedUpdateWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrationsCreateManyEventsInput = {
    id?: number
    user_id: number
    registered_at?: Date | string | null
  }

  export type registrationsUncheckedUpdateManyWithoutEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrationsCreateManyUsersInput = {
    id?: number
    event_id: number
    registered_at?: Date | string | null
  }

  export type eventsUpdateWithoutUsersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: registrationsUpdateManyWithoutEventsNestedInput
  }

  export type eventsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrations?: registrationsUncheckedUpdateManyWithoutEventsNestedInput
  }

  export type eventsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    event_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrationsUpdateWithoutUsersInput = {
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: eventsUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type registrationsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type registrationsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    registered_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}