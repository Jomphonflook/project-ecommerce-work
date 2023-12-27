import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';

@Controller('highlight')
export class HighlightController {
  constructor(private readonly highlightService: HighlightService) { }

  @Post()
  create(@Body() createHighlightDto: CreateHighlightDto) {
    return this.highlightService.create(createHighlightDto);
  }

  @Post('/getAll')
  findAll() {
    return this.highlightService.findAll();
  }

  @Put()
  remove(@Body() input: {
    id: string,
    inputUpdate: any
  },

  ) {
    return this.highlightService.updateHighlight(input);
  }
}
