import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, User } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

const mockComments: Record<number, Comment[]> = {
  1: [
    { id: 1, author: "XRPHodler", content: "Great article! I've been using the XRPL DEX for months now and it's amazing.", date: "2 days ago", likes: 12 },
    { id: 2, author: "CryptoNewbie", content: "Thanks for the breakdown of the different dApps. Really helpful for beginners like me.", date: "1 day ago", likes: 5 }
  ],
  2: [
    { id: 1, author: "DeFiExplorer", content: "The AMM explanation was super clear. Wish I had read this before I started!", date: "3 days ago", likes: 8 }
  ],
  3: [
    { id: 1, author: "SecurityFirst", content: "Everyone should read this. Lost funds to a scam before learning these lessons.", date: "5 days ago", likes: 24 }
  ]
};

export function BlogComments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>(mockComments[postId] || []);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: comments.length + 1,
        author: authorName,
        content: newComment,
        date: "Just now",
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  return (
    <div className="mt-12 pt-12 border-t border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold font-display">Comments ({comments.length})</h3>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-6 mb-8">
          {comments.map(comment => (
            <div key={comment.id} className="p-4 rounded-xl bg-card/30 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{comment.author}</div>
                  <div className="text-xs text-muted-foreground">{comment.date}</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-3">{comment.content}</p>
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid={`like-comment-${comment.id}`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mb-8">No comments yet. Be the first to share your thoughts!</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="font-bold">Leave a Comment</h4>
        <input
          type="text"
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
          placeholder="Your name"
          required
          data-testid="comment-author-input"
          className="w-full h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
        />
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          required
          rows={4}
          data-testid="comment-content-input"
          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70 resize-none"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-comment-button"
          className="bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </div>
  );
}
