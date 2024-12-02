import { Button } from 'antd';
import { EditFormIcon } from 'assets';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import NotesModal from './NotesModal';

type NotesManageProps = {};
const NotesManage: React.FC<NotesManageProps> = () => {
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setNoteOpen(true);
        }}
        icon={<EditFormIcon height={20} width={20} />}
        type='text'
        shape='circle'
        className={twMerge('ml-5 h-10 w-10', noteOpen && 'active-btn')}
      />

      <NotesModal
        onCancel={() => {
          setNoteOpen(false);
        }}
        open={noteOpen}
      />
    </>
  );
};
export default NotesManage;
