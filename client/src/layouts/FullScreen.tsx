interface FullScreenProps {
  children?: React.ReactNode;
}

function FullScreen({ children }: FullScreenProps) {
  return <div className="h-full flex flex-col items-center ">{children}</div>;
}

export default FullScreen;
