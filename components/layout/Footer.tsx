export default function Footer() {
  return (
    <footer className="border-t mt-10 py-4 text-center text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto">
        © {new Date().getFullYear()} Smart Notes by Kartik Lakra. All rights reserved.
      </div>
    </footer>
  );
}
