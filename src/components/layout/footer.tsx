
export function Footer() {
  return (
    <footer className="py-6 mt-12 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Mouheb Sliti. All rights reserved.</p>
        <p className="text-sm mt-1">Powered by Next.js and Firebase</p>
      </div>
    </footer>
  );
}
