import { useState, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

export default function ProductAdmin({ adminCode }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    stock: "",
    category: "celulares",
    description: ""
  });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const method = editing ? "PATCH" : "POST";
    const url = editing
      ? `${import.meta.env.VITE_API_URL}/api/products/${editing._id}`
      : `${import.meta.env.VITE_API_URL}/api/products`;
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-code": adminCode
      },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ title: "", price: "", image: "", stock: "", category: "celulares", description: "" });
      setEditing(null);
      fetchProducts();
    } else {
      alert("Error guardando producto");
    }
  };

  const handleEdit = product => {
    setEditing(product);
    setForm({
      title: product.title || "",
      price: product.price || "",
      image: product.image || "",
      stock: product.stock || "",
      category: product.category || "celulares",
      description: product.description || ""
    });
  };

  const handleDelete = async id => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { "x-admin-code": adminCode }
    });
    if (res.ok) fetchProducts();
    else alert("Error eliminando producto");
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-black mb-4 text-cyan-400">Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Nombre" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" type="number" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL Imagen" className="p-2 rounded bg-gray-800 text-white" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="p-2 rounded bg-gray-800 text-white" />
        <select name="category" value={form.category} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white">
          <option value="celulares">Celulares</option>
          <option value="audifonos">Audífonos</option>
          <option value="cargadores">Cargadores</option>
          <option value="cables">Cables</option>
          <option value="accesorios">Accesorios</option>
          <option value="protectores">Protectores</option>
        </select>
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="p-2 rounded bg-gray-800 text-white" />
        <button type="submit" className="col-span-2 px-4 py-2 bg-cyan-500 text-white font-black rounded-xl mt-2">
          {editing ? "Actualizar" : "Crear"} Producto
        </button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setForm({ title: "", price: "", image: "", stock: "", category: "celulares", description: "" }); }} className="col-span-2 px-4 py-2 bg-gray-700 text-white font-black rounded-xl mt-2">
            Cancelar Edición
          </button>
        )}
      </form>
      {loading ? (
        <div className="text-gray-400">Cargando productos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product._id} className="p-4 rounded-xl bg-gray-900 border border-cyan-700 flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                {product.image && (
                  <OptimizedImage
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                    loading="lazy"
                    decoding="async"
                    srcSet={`
                      ${product.image} 1x,
                      ${product.image.replace(/\.(jpg|jpeg|png|webp)$/i, '@2x.$1')} 2x
                    `}
                    sizes="(max-width: 768px) 64px, 128px"
                  />
                )}
                <div>
                  <h3 className="font-black text-white">{product.title}</h3>
                  <p className="text-cyan-400 font-bold">${product.price?.toLocaleString("es-CO")}</p>
                  <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                  <p className="text-xs text-gray-400">Categoría: {product.category}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(product)} className="px-3 py-1 bg-blue-500 text-white rounded font-bold">Editar</button>
                <button onClick={() => handleDelete(product._id)} className="px-3 py-1 bg-red-500 text-white rounded font-bold">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
