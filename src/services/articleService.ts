import { supabase } from '../lib/supabase';
import { Article, Paragraph, KeyTerm, ComplexSentence } from '../types';

// Fetch all articles
export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!articles) return [];

    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        return await fetchArticleWithDetails(article.id);
      })
    );

    return articlesWithDetails.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// Fetch all articles including drafts (for admin use)
export const fetchAllArticles = async (): Promise<Article[]> => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!articles) return [];

    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        return await fetchArticleWithDetails(article.id);
      })
    );

    return articlesWithDetails.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
};

// Fetch articles by category
export const fetchArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!articles) return [];

    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        return await fetchArticleWithDetails(article.id);
      })
    );

    return articlesWithDetails.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return [];
  }
};

// Fetch article by ID with all related data
export const fetchArticleById = async (id: string, isAdmin: boolean = false): Promise<Article | null> => {
  try {
    const article = await fetchArticleWithDetails(id);
    
    // 如果不是管理员且文章是草稿状态，则返回null
    if (!isAdmin && article && article.status === 'draft') {
      return null;
    }
    
    return article;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
};

// Helper function to fetch article with all related data
const fetchArticleWithDetails = async (id: string): Promise<Article | null> => {
  try {
    // Fetch the article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (articleError) throw articleError;
    if (!article) return null;

    // Fetch article content
    const { data: contentData, error: contentError } = await supabase
      .from('article_content')
      .select('*')
      .eq('article_id', id)
      .order('position', { ascending: true });

    if (contentError) throw contentError;

    // Fetch key terms
    const { data: keyTermsData, error: keyTermsError } = await supabase
      .from('key_terms')
      .select('*')
      .eq('article_id', id);

    if (keyTermsError) throw keyTermsError;

    // Fetch complex sentences
    const { data: sentencesData, error: sentencesError } = await supabase
      .from('complex_sentences')
      .select('*')
      .eq('article_id', id);

    if (sentencesError) throw sentencesError;

    // Transform data to match the Article type
    const content: Paragraph[] = contentData?.map(item => ({
      english: item.english,
      chinese: item.chinese || undefined
    })) || [];

    const keyTerms: KeyTerm[] = keyTermsData?.map(item => ({
      term: item.term,
      definition: item.definition
    })) || [];

    const complexSentences: ComplexSentence[] = sentencesData?.map(item => ({
      english: item.english,
      chinese: item.chinese,
      analysis: item.analysis
    })) || [];

    return {
      id: article.id,
      title: article.title,
      summary: article.summary,
      content,
      author: article.author,
      authorTitle: article.author_title || undefined,
      category: article.category,
      status: article.status as 'published' | 'draft',
      publishedAt: article.published_at,
      coverImage: article.cover_image,
      imageCaption: article.image_caption || undefined,
      readingTime: article.reading_time || undefined,
      keyTerms,
      complexSentences
    };
  } catch (error) {
    console.error(`Error in fetchArticleWithDetails for ID ${id}:`, error);
    return null;
  }
};

// Create a new article
export const createArticle = async (articleData: Omit<Article, 'id'>): Promise<Article | null> => {
  try {
    // Insert the article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: articleData.title,
        summary: articleData.summary,
        author: articleData.author,
        author_title: articleData.authorTitle || null,
        category: articleData.category,
        status: articleData.status,
        published_at: articleData.publishedAt,
        cover_image: articleData.coverImage,
        image_caption: articleData.imageCaption || null,
        reading_time: articleData.readingTime || null
      })
      .select()
      .single();

    if (articleError) throw articleError;
    if (!article) throw new Error('Failed to create article');

    // Insert content paragraphs
    if (articleData.content.length > 0) {
      const contentToInsert = articleData.content.map((paragraph, index) => ({
        article_id: article.id,
        english: paragraph.english,
        chinese: paragraph.chinese || null,
        position: index + 1
      }));

      const { error: contentError } = await supabase
        .from('article_content')
        .insert(contentToInsert);

      if (contentError) throw contentError;
    }

    // Insert key terms
    if (articleData.keyTerms.length > 0) {
      const termsToInsert = articleData.keyTerms.map(term => ({
        article_id: article.id,
        term: term.term,
        definition: term.definition
      }));

      const { error: termsError } = await supabase
        .from('key_terms')
        .insert(termsToInsert);

      if (termsError) throw termsError;
    }

    // Insert complex sentences
    if (articleData.complexSentences.length > 0) {
      const sentencesToInsert = articleData.complexSentences.map(sentence => ({
        article_id: article.id,
        english: sentence.english,
        chinese: sentence.chinese,
        analysis: sentence.analysis
      }));

      const { error: sentencesError } = await supabase
        .from('complex_sentences')
        .insert(sentencesToInsert);

      if (sentencesError) throw sentencesError;
    }

    // Return the created article with all its details
    return await fetchArticleById(article.id);
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
};

// Update an existing article
export const updateArticle = async (id: string, articleData: Partial<Article>): Promise<Article | null> => {
  try {
    // Update the article
    if (articleData.title || articleData.summary || articleData.author || 
        articleData.category || articleData.status || articleData.publishedAt || 
        articleData.coverImage || articleData.readingTime) {
      
      const updateData: any = {
        updated_at: new Date().toISOString()
      };
      
      if (articleData.title) updateData.title = articleData.title;
      if (articleData.summary) updateData.summary = articleData.summary;
      if (articleData.author) updateData.author = articleData.author;
      if (articleData.authorTitle !== undefined) updateData.author_title = articleData.authorTitle;
      if (articleData.category) updateData.category = articleData.category;
      if (articleData.status) updateData.status = articleData.status;
      if (articleData.publishedAt) updateData.published_at = articleData.publishedAt;
      if (articleData.coverImage) updateData.cover_image = articleData.coverImage;
      if (articleData.imageCaption !== undefined) updateData.image_caption = articleData.imageCaption;
      if (articleData.readingTime !== undefined) updateData.reading_time = articleData.readingTime;

      const { error: updateError } = await supabase
        .from('articles')
        .update(updateData)
        .eq('id', id);

      if (updateError) throw updateError;
    }

    // Update content if provided
    if (articleData.content) {
      // Delete existing content
      const { error: deleteContentError } = await supabase
        .from('article_content')
        .delete()
        .eq('article_id', id);

      if (deleteContentError) throw deleteContentError;

      // Insert new content
      const contentToInsert = articleData.content.map((paragraph, index) => ({
        article_id: id,
        english: paragraph.english,
        chinese: paragraph.chinese || null,
        position: index + 1
      }));

      const { error: insertContentError } = await supabase
        .from('article_content')
        .insert(contentToInsert);

      if (insertContentError) throw insertContentError;
    }

    // Update key terms if provided
    if (articleData.keyTerms) {
      // Delete existing terms
      const { error: deleteTermsError } = await supabase
        .from('key_terms')
        .delete()
        .eq('article_id', id);

      if (deleteTermsError) throw deleteTermsError;

      // Insert new terms if there are any
      if (articleData.keyTerms.length > 0) {
        const termsToInsert = articleData.keyTerms.map(term => ({
          article_id: id,
          term: term.term,
          definition: term.definition
        }));

        const { error: insertTermsError } = await supabase
          .from('key_terms')
          .insert(termsToInsert);

        if (insertTermsError) throw insertTermsError;
      }
    }

    // Update complex sentences if provided
    if (articleData.complexSentences) {
      // Delete existing sentences
      const { error: deleteSentencesError } = await supabase
        .from('complex_sentences')
        .delete()
        .eq('article_id', id);

      if (deleteSentencesError) throw deleteSentencesError;

      // Insert new sentences if there are any
      if (articleData.complexSentences.length > 0) {
        const sentencesToInsert = articleData.complexSentences.map(sentence => ({
          article_id: id,
          english: sentence.english,
          chinese: sentence.chinese,
          analysis: sentence.analysis
        }));

        const { error: insertSentencesError } = await supabase
          .from('complex_sentences')
          .insert(sentencesToInsert);

        if (insertSentencesError) throw insertSentencesError;
      }
    }

    // Return the updated article with all its details
    return await fetchArticleById(id);
  } catch (error) {
    console.error(`Error updating article with ID ${id}:`, error);
    return null;
  }
};

// Delete an article
export const deleteArticle = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting article with ID ${id}:`, error);
    return false;
  }
};

// Search articles by query
export const searchArticles = async (query: string): Promise<Article[]> => {
  try {
    if (!query.trim()) return [];
    
    // Search in articles table for title and summary matches
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!articles || articles.length === 0) return [];

    // Fetch full article details for matching articles
    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        return await fetchArticleWithDetails(article.id);
      })
    );

    return articlesWithDetails.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
};

// Search all articles by query (including drafts, for admin use)
export const searchAllArticles = async (query: string): Promise<Article[]> => {
  try {
    if (!query.trim()) return [];
    
    // Search in articles table for title and summary matches
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!articles || articles.length === 0) return [];

    // Fetch full article details for matching articles
    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        return await fetchArticleWithDetails(article.id);
      })
    );

    return articlesWithDetails.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error searching all articles:', error);
    return [];
  }
};