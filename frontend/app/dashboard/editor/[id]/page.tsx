import EditorClient from "./EditorClient";

export default function EditorPage({ params }: { params: { id: string } }) {
  return <EditorClient id={params.id} />;
}
