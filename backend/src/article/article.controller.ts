// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   Query,
//   ConflictException,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { User } from '../user/user.decorator';
// import { IArticleRO, IArticlesRO, ICommentsRO } from './article.interface';
// import { ArticleService } from './article.service';
// import { CreateArticleDto, CreateCommentDto } from './dto';
// import { UpdateArticleDto } from './dto/update-article.dto';

// @ApiBearerAuth()
// @ApiTags('articles')
// @Controller('articles')
// export class ArticleController {
//   constructor(private readonly articleService: ArticleService) {}

//   // ------------------ GET ALL ------------------
//   @ApiOperation({ summary: 'Get all articles' })
//   @ApiResponse({ status: 200, description: 'Return all articles.' })
//   @Get()
//   async findAll(@User('id') userId: number, @Query() query: Record<string, string>): Promise<IArticlesRO> {
//     return this.articleService.findAll(userId, query);
//   }

//   // ------------------ FEED ------------------
//   @ApiOperation({ summary: 'Get article feed' })
//   @ApiResponse({ status: 200, description: 'Return article feed.' })
//   @Get('feed')
//   async getFeed(@User('id') userId: number, @Query() query: Record<string, string>): Promise<IArticlesRO> {
//     return this.articleService.findFeed(userId, query);
//   }

//   // ------------------ GET ONE ------------------
//   @Get(':slug')
//   async findOne(@User('id') userId: number, @Param('slug') slug: string): Promise<IArticleRO> {
//     return this.articleService.findOne(userId, { slug });
//   }

//   // ------------------ COMMENTS ------------------
//   @Get(':slug/comments')
//   async findComments(@Param('slug') slug: string): Promise<ICommentsRO> {
//     return this.articleService.findComments(slug);
//   }

//   @ApiOperation({ summary: 'Create comment' })
//   @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
//   @Post(':slug/comments')
//   async createComment(
//     @User('id') userId: number,
//     @Param('slug') slug: string,
//     @Body('comment') commentData: CreateCommentDto,
//   ) {
//     return this.articleService.addComment(userId, slug, commentData);
//   }

//   @ApiOperation({ summary: 'Delete comment' })
//   @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
//   @Delete(':slug/comments/:id')
//   async deleteComment(@User('id') userId: number, @Param() params: Record<string, string>) {
//     const { slug, id } = params;
//     return this.articleService.deleteComment(userId, slug, +id);
//   }

//   // ------------------ CREATE ------------------
//   @ApiOperation({ summary: 'Create article' })
//   @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
//   @Post()
//   async create(@User('id') userId: number, @Body('article') articleData: CreateArticleDto): Promise<IArticleRO> {
//     return this.articleService.create(userId, articleData);
//   }

//   // ------------------ UPDATE ------------------
//   @ApiOperation({ summary: 'Update article' })
//   @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
//   @Put(':slug')
//   async update(
//     @User('id') userId: number,
//     @Param('slug') slug: string,
//     @Body('article') articleData: UpdateArticleDto,
//   ): Promise<IArticleRO> {
//     try {
//       return await this.articleService.update(userId, slug, articleData);
//     }catch (error) {
//   if (error instanceof Error && error.message === 'Article is currently locked by another user.') {
//     throw new ConflictException('Article is currently locked by another user.');
//   }
//   throw error;
// }
//   }

//   // ------------------ DELETE ------------------
//   @ApiOperation({ summary: 'Delete article' })
//   @ApiResponse({ status: 200, description: 'The article has been successfully deleted.' })
//   @Delete(':slug')
//   async delete(@Param('slug') slug: string) {
//     return this.articleService.delete(slug);
//   }

//   // ------------------ FAVORITE ------------------
//   @ApiOperation({ summary: 'Favorite article' })
//   @ApiResponse({ status: 201, description: 'The article has been successfully favorited.' })
//   @Post(':slug/favorite')
//   async favorite(@User('id') userId: number, @Param('slug') slug: string) {
//     return this.articleService.favorite(userId, slug);
//   }

//   @ApiOperation({ summary: 'Unfavorite article' })
//   @ApiResponse({ status: 201, description: 'The article has been successfully unfavorited.' })
//   @Delete(':slug/favorite')
//   async unFavorite(@User('id') userId: number, @Param('slug') slug: string) {
//     return this.articleService.unFavorite(userId, slug);
//   }
// }


import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ConflictException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { IArticleRO, IArticlesRO, ICommentsRO } from './article.interface';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateCommentDto } from './dto';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // ------------------ GET ALL ------------------
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Return all articles.' })
  @Get()
  async findAll(
    @User('id') userId: number,
    @Query() query: Record<string, string>,
  ): Promise<IArticlesRO> {
    return this.articleService.findAll(userId, query);
  }

  // ------------------ FEED ------------------
  @ApiOperation({ summary: 'Get article feed' })
  @ApiResponse({ status: 200, description: 'Return article feed.' })
  @Get('feed')
  async getFeed(
    @User('id') userId: number,
    @Query() query: Record<string, string>,
  ): Promise<IArticlesRO> {
    return this.articleService.findFeed(userId, query);
  }

  // ------------------ GET ONE ------------------
  @Get(':slug')
  async findOne(
    @User('id') userId: number,
    @Param('slug') slug: string,
  ): Promise<IArticleRO> {
    return this.articleService.findOne(userId, { slug });
  }

  // ------------------ COMMENTS ------------------
  @Get(':slug/comments')
  async findComments(@Param('slug') slug: string): Promise<ICommentsRO> {
    return this.articleService.findComments(slug);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @Post(':slug/comments')
  async createComment(
    @User('id') userId: number,
    @Param('slug') slug: string,
    @Body('comment') commentData: CreateCommentDto,
  ) {
    return this.articleService.addComment(userId, slug, commentData);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @Delete(':slug/comments/:id')
  async deleteComment(@User('id') userId: number, @Param() params: Record<string, string>) {
    const { slug, id } = params;
    return this.articleService.deleteComment(userId, slug, +id);
  }

  // ------------------ CREATE ARTICLE ------------------
  @ApiOperation({ summary: 'Create article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @Post()
  async create(
    @User('id') userId: number,
    @Body('article') articleData: CreateArticleDto,
  ): Promise<IArticleRO> {
    return this.articleService.create(userId, articleData);
  }

  // ------------------ UPDATE ARTICLE ------------------
  @ApiOperation({ summary: 'Update article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
  @Put(':slug')
  async update(
    @User('id') userId: number,
    @Param('slug') slug: string,
    @Body('article') articleData: UpdateArticleDto,
  ): Promise<IArticleRO> {
    try {
      return await this.articleService.update(userId, slug, articleData);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Article is currently locked by another user.'
      ) {
        throw new ConflictException('Article is currently locked by another user.');
      }
      throw error;
    }
  }

  // ------------------ DELETE ARTICLE ------------------
  @ApiOperation({ summary: 'Delete article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully deleted.' })
  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return this.articleService.delete(slug);
  }

  // ------------------ FAVORITE ------------------
  @ApiOperation({ summary: 'Favorite article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully favorited.' })
  @Post(':slug/favorite')
  async favorite(@User('id') userId: number, @Param('slug') slug: string) {
    return this.articleService.favorite(userId, slug);
  }

  @ApiOperation({ summary: 'Unfavorite article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully unfavorited.' })
  @Delete(':slug/favorite')
  async unFavorite(@User('id') userId: number, @Param('slug') slug: string) {
    return this.articleService.unFavorite(userId, slug);
  }
}
