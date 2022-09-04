interface FooterProps {
  children?: React.ReactNode;
}

function Footer({ children }: FooterProps) {
  return <footer className="flex flex-col gap-4 pl-12">{children}</footer>;
}

export default Footer;
