import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    onSubmit(email);
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="card-romantic">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-secondary">
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="font-display text-2xl text-center text-foreground mb-2">
          One more thing...
        </h3>
        <p className="text-muted-foreground text-center mb-6 font-body">
          Enter your email to receive your reservation confirmation 💌
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>
          <button type="submit" className="btn-valentine w-full flex items-center justify-center gap-2">
            Confirm <Heart className="w-5 h-5" fill="currentColor" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailForm;
