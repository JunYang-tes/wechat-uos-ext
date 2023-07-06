import { ipcRenderer } from "../inject/hook-points/ipcRender";

export function getConversationList() {
  return ipcRenderer.invoke(
    'ConversationManager.getConversationList', []
  ) as Promise<{
    conversation: Array<{
      conversationName: string,
      avatarUrl: string,
      nickname: string,
    }>
  }>
}

export function getContactList() {
  return ipcRenderer.invoke('ContactManager.getContactList', []) as Promise<
    {
      contact: Array<{
        username: string, nickname: string, hdAvatarUrl: string,
        pyquan: string
      }>
    }>
}

export function getChatMembers(id: string) {
  return ipcRenderer.invoke('ChatRoomManager.getChatRoomMemberList', [
    'ChatRoomManager.getChatRoomMemberList',
    id
  ]) as
    Promise<{
      chatroomMember: Array<{
        avatarUrl: string,
        displayName: string,
        hdAvatarUrl: string,
        nickName: string,
        username: string
      }>
    }>
}
