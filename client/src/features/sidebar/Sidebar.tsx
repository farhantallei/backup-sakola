import { useDashboardContext } from '@app/context/DashboardContext';
import {
  IconArchive,
  IconCheckupList,
  IconCircleCheck,
  IconHome,
  IconNote,
  IconRefresh,
} from '@tabler/icons';
import { Divider, Section } from './components';
import { Container, Footer } from './layouts';

// TODO: Responsive apple sidebar
function Sidebar() {
  const { isSidebarOpen } = useDashboardContext();
  if (!isSidebarOpen) return null;
  return (
    <Container>
      <Section>
        <Section.Item to="/beranda" Icon={IconHome}>
          Beranda
        </Section.Item>
        <Section.Item to="/draf" Icon={IconNote}>
          Draf
        </Section.Item>
        <Section.Item to="/arsip" Icon={IconArchive}>
          Arsip
        </Section.Item>
        <Section.Item to="/to-do" Icon={IconCheckupList}>
          To-do
        </Section.Item>
      </Section>
      <Divider />
      <Section>
        <Section.Title>Terbit</Section.Title>
        <Section.Item to="/berjalan" Icon={IconRefresh}>
          Berjalan
        </Section.Item>
        <Section.Item to="/selesai" Icon={IconCircleCheck}>
          Selesai
        </Section.Item>
      </Section>
      <Divider />
      <Footer>
        <a className="font-semibold text-gray-400 hover:text-gray-500">
          Tentang kami
        </a>
        <span className="text-gray-300">© 2022 Sakola</span>
      </Footer>
    </Container>
  );
}

export default Sidebar;
