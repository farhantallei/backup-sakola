interface FullScreenProps {
  children?: React.ReactNode;
}

function FullScreen({ children }: FullScreenProps) {
  return (
    <div className="h-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export default FullScreen;
