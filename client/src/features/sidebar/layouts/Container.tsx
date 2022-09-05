interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <aside className="flex flex-col sticky top-16 basis-80 h-[calc(100vh-4rem)] pt-12 pb-6 border-r overflow-y-auto">
      {children}
    </aside>
  );
}

export default Container;
