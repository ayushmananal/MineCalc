import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-8">
      <div className="text-center">
        <h1 className="text-4xl font-pixel text-foreground mb-8 tracking-wide">
          MINECRAFT CALCULATOR
        </h1>
        <Calculator />
        <p className="text-sm font-pixel text-muted-foreground mt-6 tracking-wide">
          RETRO PIXELATED CALCULATOR
        </p>
      </div>
    </div>
  );
};

export default Index;
