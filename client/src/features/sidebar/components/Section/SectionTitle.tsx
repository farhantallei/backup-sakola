import { Text } from '@app/components/typography';

interface SectionTitleProps {
  children?: React.ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="ml-12">
      <Text
        size="xs"
        weight={800}
        transform="uppercase"
        className="text-gray-400 tracking-wider">
        {children}
      </Text>
    </div>
  );
}

export default SectionTitle;
