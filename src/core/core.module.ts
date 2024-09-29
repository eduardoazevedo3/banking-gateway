import { Module } from '@nestjs/common';
import { RecordExistsValidator } from './validators/record-exists.validator';
import { UniqueRecordValidator } from './validators/unique-record.validator';

@Module({
  providers: [RecordExistsValidator, UniqueRecordValidator],
  exports: [RecordExistsValidator, UniqueRecordValidator],
})
export class CoreModule {}
