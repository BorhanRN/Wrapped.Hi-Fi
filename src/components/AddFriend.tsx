
import React, { useState } from 'react';
import { User, X } from 'lucide-react';

const AddFriend: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      setIsOpen(false);
      
      // Show success toast
      console.log('Friend invitation sent to', email);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card rounded-xl p-5 w-full flex flex-col items-center justify-center text-foreground/70 hover:text-foreground hover-scale"
        style={{ minHeight: '156px' }}
      >
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
          <User size={24} />
        </div>
        <p className="font-medium">Add New Friend</p>
        <p className="text-sm mt-1">Connect with friends to stay focused together</p>
      </button>
    );
  }

  return (
    <div className="glass-card rounded-xl p-5 w-full animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Invite a Friend</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-secondary transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium mb-1 block">
            Friend's Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your friend's email"
            className="w-full p-2 rounded-md border border-slate-200 focus:focus-ring"
            autoFocus
          />
        </div>
        
        <button
          type="submit"
          disabled={!email || isSubmitting}
          className={`w-full py-2 rounded-md bg-accent text-white font-medium transition-colors ${
            !email || isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-accent/90'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
              Sending...
            </span>
          ) : (
            'Send Invitation'
          )}
        </button>
      </form>
      
      <div className="mt-4">
        <p className="text-sm text-foreground/70 text-center">
          Or share your profile link with friends
        </p>
        <div className="mt-2 p-2 rounded-md bg-secondary/70 text-sm font-mono truncate">
          focusfriends.app/user/jamie
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
