import { Module } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { HighlightController } from './highlight.controller';
import { highlightProvider } from 'src/database/provider/hightlight.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HighlightController],
  providers: [HighlightService, ...highlightProvider],
})
export class HighlightModule {}
