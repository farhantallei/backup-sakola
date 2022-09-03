import {
  IconArchive,
  IconCheckupList,
  IconHome,
  IconNote,
} from '@tabler/icons';

// TODO: Responsive apple sidebar
function Sidebar() {
  return (
    <aside className="flex flex-col sticky top-16 basis-80 h-[calc(100vh-4rem)] pt-12 pb-6 border-r overflow-y-auto">
      <section className="flex flex-col items-start gap-3">
        <div className="relative w-full pl-8 pr-8 before:absolute before:h-8 before:w-1.5 before:bg-sky-500 before:top-1/2 before:left-0 before:rounded-tr-md before:rounded-br-md before:-translate-y-1/2">
          <div className="flex flex-row gap-2 bg-gray-100 bg-opacity-50 px-4 py-3 rounded-xl text-gray-400 font-semibold">
            <IconHome size={24} />
            <span>Beranda</span>
          </div>
        </div>
        <div className="relative w-full pl-8 pr-8 before:absolute before:h-8 before:w-1.5 before:top-1/2 before:left-0 before:rounded-tr-md before:rounded-br-md before:-trangray-y-1/2">
          <div className="flex flex-row gap-2 px-4 py-3 rounded-xl text-gray-400 font-semibold hover:bg-gray-50 hover:bg-opacity-50">
            <IconNote size={24} />
            <span>Draf</span>
          </div>
        </div>
        <div className="relative w-full pl-8 pr-8 before:absolute before:h-8 before:w-1.5 before:top-1/2 before:left-0 before:rounded-tr-md before:rounded-br-md before:-trangray-y-1/2">
          <div className="flex flex-row gap-2 px-4 py-3 rounded-xl text-gray-400 font-semibold hover:bg-gray-50 hover:bg-opacity-50">
            <IconArchive size={24} />
            <span>Arsip</span>
          </div>
        </div>
        <div className="relative w-full pl-8 pr-8 before:absolute before:h-8 before:w-1.5 before:top-1/2 before:left-0 before:rounded-tr-md before:rounded-br-md before:-trangray-y-1/2">
          <div className="flex flex-row gap-2 px-4 py-3 rounded-xl text-gray-400 font-semibold hover:bg-gray-50 hover:bg-opacity-50">
            <IconCheckupList size={24} />
            <span>To-do</span>
          </div>
        </div>
      </section>
      <div className="px-10 my-6">
        <hr className="border-t-2 border-gray-100 border-dashed" />
      </div>
      <footer className="flex flex-col gap-4 pl-12">
        <a className="font-semibold text-gray-400 hover:text-gray-500">
          Tentang kami
        </a>
        <span className="text-gray-300">© 2022 Sakola</span>
      </footer>
    </aside>
  );
}

export default Sidebar;
