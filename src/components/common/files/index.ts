import OriginFile from './File';
import ServerFile from './ServerFile';
import ServerFileList from './ServerFileList';
export type FileProps = typeof OriginFile & {
  Server: typeof ServerFile;
};
const File = OriginFile as FileProps;
File.Server = ServerFile;

export { File, ServerFileList };
