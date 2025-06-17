import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { deleteNews } from "./newsSlice";
import { NewsForm } from "./NewsForm";
import { useState } from "react";

export const NewsList = () => {
  const news = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div className="news-list">
      <h2>Список новостей</h2>
      <NewsForm editingId={editing} setEditing={setEditing} />
      {news.map((item) => (
        <div key={item.id} className="news-card">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <button onClick={() => setEditing(item.id)}>Редактировать</button>
          <button onClick={() => dispatch(deleteNews(item.id))}>Удалить</button>
        </div>
      ))}
    </div>
  );
};
