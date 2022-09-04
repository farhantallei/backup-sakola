import SectionItem from './SectionItem';
import SectionTitle from './SectionTitle';

interface SectionProps {
  children?: React.ReactNode;
}

function Section({ children }: SectionProps) {
  return (
    <section className="flex flex-col items-start gap-3">{children}</section>
  );
}

Section.Item = SectionItem;
Section.Title = SectionTitle;
export default Section;
