import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './questions.schema';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return createdQuestion.save();
  }

  async getQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async getQuestionById(id: string): Promise<Question> {
    return this.questionModel.findById(id).exec();
  }

  async updateQuestion(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionModel
      .findByIdAndUpdate(id, updateQuestionDto, { new: true })
      .exec();
  }

  async deleteQuestion(id: string): Promise<Question> {
    return this.questionModel.findByIdAndDelete(id).exec();
  }

  async getQuestionsByIndex(index: number, event: string): Promise<Question[]> {
    return this.questionModel.find({ index, event }).exec();
  }
}
