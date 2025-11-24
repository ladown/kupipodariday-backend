export enum PostgresErrorCode {
  UniqueViolation = '23505', // Нарушение уникального ограничения
  ForeignKeyViolation = '23503', // Нарушение внешнего ключа
  NotNullViolation = '23502', // Нарушение NOT NULL
  CheckViolation = '23514', // Нарушение CHECK
  ExclusionViolation = '23P01', // Нарушение EXCLUDE
}
