import { useDispatch, useSelector } from "react-redux";
import { addNews, updateNews } from "./newsSlice";
import { useState, useEffect } from "react";
import { RootState } from "../app/store";
import { v4 as uuidv4 } from "uuid";

export const NewsForm = ({
  editingId,
  setEditing,
}: {
  editingId: string | null;
  setEditing: (id: string | null) => void;
}) => {
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news);
  const editingItem = news.find((n) => n.id === editingId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setContent(editingItem.content);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateNews({ id: editingId, title, content }));
      setEditing(null);
    } else {
      dispatch(addNews({ id: uuidv4(), title, content }));
    }
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="news-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержание"
        required
      />
      <button type="submit">{editingId ? "Сохранить" : "Добавить"}</button>
    </form>
  );
};
