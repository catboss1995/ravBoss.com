const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['adventure', 'news', 'guide', 'announcement'],
    default: 'adventure'
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  featuredImage: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    readingTime: {
      type: Number, // 預估閱讀時間（分鐘）
      default: 1
    },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String]
  }
}, {
  timestamps: true
})

// 索引設定
postSchema.index({ title: 'text', content: 'text' }) // 全文搜索
postSchema.index({ category: 1, status: 1 })
postSchema.index({ createdAt: -1 })
postSchema.index({ featured: -1, createdAt: -1 })

// 自動生成摘要
postSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    // 移除 HTML 標籤並截取前150個字符作為摘要
    const plainText = this.content.replace(/<[^>]*>/g, '')
    this.excerpt = plainText.length > 150 
      ? plainText.substring(0, 150) + '...' 
      : plainText
  }
  
  // 計算預估閱讀時間（假設每分鐘閱讀250個字）
  if (this.content) {
    const wordCount = this.content.replace(/<[^>]*>/g, '').length
    this.metadata.readingTime = Math.max(1, Math.ceil(wordCount / 250))
  }
  
  next()
})

// 靜態方法：獲取熱門文章
postSchema.statics.getPopular = function(limit = 5) {
  return this.find({ status: 'published' })
    .sort({ views: -1, likes: -1 })
    .limit(limit)
    .populate('author', 'username profile.displayName')
}

// 靜態方法：獲取精選文章
postSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ status: 'published', featured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('author', 'username profile.displayName')
}

// 靜態方法：按分類獲取文章
postSchema.statics.getByCategory = function(category, page = 1, limit = 10) {
  const skip = (page - 1) * limit
  return this.find({ status: 'published', category })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username profile.displayName')
}

// 實例方法：增加觀看次數
postSchema.methods.incrementViews = function() {
  this.views += 1
  return this.save()
}

// 實例方法：添加評論
postSchema.methods.addComment = function(author, content) {
  this.comments.push({ author, content })
  return this.save()
}

// 虛擬字段：評論數量
postSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

// 確保虛擬字段在 JSON 輸出中包含
postSchema.set('toJSON', { virtuals: true })
postSchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('Post', postSchema)