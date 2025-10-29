import { useEffect, useMemo, useState } from "react";
import { getAllProducts, updateProduct, deleteProduct, createProduct, getProductById } from "../../config/firestoreService";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ nombre: "", precio: 0, stock: 0, categoria: "", imagen: "" });
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({ nombre: "", precio: "", stock: "", categoria: "", imagen: "" });
  const [filter, setFilter] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return products;
    const f = filter.toLowerCase();
    return products.filter(p =>
      (p.nombre || "").toLowerCase().includes(f) ||
      (p.categoria || "").toLowerCase().includes(f) ||
      (p.id || "").toLowerCase().includes(f)
    );
  }, [filter, products]);

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      nombre: p.nombre || "",
      precio: p.precio ?? 0,
      stock: p.stock ?? 0,
      categoria: p.categoria || "",
      imagen: p.imagen || "",
    });
  };

  const onCancel = () => {
    setEditingId(null);
    setForm({ nombre: "", precio: 0, stock: 0, categoria: "", imagen: "" });
  };

  const onSave = async (id) => {
    try {
      const current = await getProductById(id);
      const nextPrecio = Number(form.precio) || 0;
      const updates = {
        nombre: form.nombre,
        precio: nextPrecio,
        stock: Number(form.stock) || 0,
        categoria: form.categoria,
        imagen: form.imagen,
      };
      if (current && typeof current.precio !== "undefined" && current.precio !== nextPrecio) {
        updates.precioAnterior = current.precio;
      }
      await updateProduct(id, updates);
      await load();
      onCancel();
      alert("✅ Producto actualizado");
    } catch (e) {
      console.error(e);
      alert("❌ Error al actualizar");
    }
  };

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    try {
      await deleteProduct(id);
      await load();
      alert("🗑️ Producto eliminado");
    } catch (e) {
      console.error(e);
      alert("❌ Error al eliminar");
    }
  };

  const onCreate = async () => {
    try {
      setCreating(true);
      const payload = {
        nombre: createForm.nombre.trim(),
        precio: Number(createForm.precio) || 0,
        stock: Number(createForm.stock) || 0,
        categoria: createForm.categoria.trim(),
        imagen: createForm.imagen.trim(),
      };
      if (!payload.nombre) {
        alert("El nombre es requerido");
        return;
      }
      await createProduct(payload);
      setCreateForm({ nombre: "", precio: "", stock: "", categoria: "", imagen: "" });
      await load();
      alert("✅ Producto creado");
    } catch (e) {
      console.error(e);
      alert("❌ Error al crear producto");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
        <p className="text-white/70">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-white text-xl font-bold">Gestión de Productos</h3>
          <div className="flex items-center gap-3">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por nombre, categoría o ID"
              className="px-3 py-2 rounded-lg bg-black/50 border border-green-400/30 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            />
          </div>
        </div>
      </div>

      {/* Crear producto */}
      <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4">Crear nuevo producto</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input className="px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" placeholder="Nombre" value={createForm.nombre} onChange={(e)=>setCreateForm({...createForm, nombre:e.target.value})} />
          <input className="px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" placeholder="Precio" type="number" value={createForm.precio} onChange={(e)=>setCreateForm({...createForm, precio:e.target.value})} />
          <input className="px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" placeholder="Stock" type="number" value={createForm.stock} onChange={(e)=>setCreateForm({...createForm, stock:e.target.value})} />
          <input className="px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" placeholder="Categoría" value={createForm.categoria} onChange={(e)=>setCreateForm({...createForm, categoria:e.target.value})} />
          <input className="px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" placeholder="URL Imagen" value={createForm.imagen} onChange={(e)=>setCreateForm({...createForm, imagen:e.target.value})} />
        </div>
        <div className="mt-3">
          <button disabled={creating} onClick={onCreate} className={`px-4 py-2 rounded-lg font-bold ${creating ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-black'} `}>
            {creating ? 'Creando...' : 'Crear Producto'}
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-green-400">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Nombre</th>
              <th className="py-2 pr-4">Precio</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Categoría</th>
              <th className="py-2 pr-4">Imagen</th>
              <th className="py-2 pr-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-white/90">
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-green-400/20 align-top">
                <td className="py-3 pr-4 whitespace-nowrap text-white/60">{p.id}</td>
                <td className="py-3 pr-4 min-w-[200px]">
                  {editingId === p.id ? (
                    <input className="w-full px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" value={form.nombre} onChange={(e)=>setForm({...form, nombre:e.target.value})} />
                  ) : (
                    p.nombre || "-"
                  )}
                </td>
                <td className="py-3 pr-4 w-28">
                  {editingId === p.id ? (
                    <input type="number" className="w-full px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" value={form.precio} onChange={(e)=>setForm({...form, precio:e.target.value})} />
                  ) : (
                    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(p.precio ?? 0)
                  )}
                </td>
                <td className="py-3 pr-4 w-24">
                  {editingId === p.id ? (
                    <input type="number" className="w-full px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" value={form.stock} onChange={(e)=>setForm({...form, stock:e.target.value})} />
                  ) : (
                    p.stock ?? 0
                  )}
                </td>
                <td className="py-3 pr-4 w-40">
                  {editingId === p.id ? (
                    <input className="w-full px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" value={form.categoria} onChange={(e)=>setForm({...form, categoria:e.target.value})} />
                  ) : (
                    p.categoria || "-"
                  )}
                </td>
                <td className="py-3 pr-4 w-56">
                  {editingId === p.id ? (
                    <input className="w-full px-3 py-2 rounded bg-black/50 border border-green-400/30 text-white" value={form.imagen} onChange={(e)=>setForm({...form, imagen:e.target.value})} />
                  ) : (
                    p.imagen ? (
                      <div className="flex items-center gap-2">
                        <img src={p.imagen} alt={p.nombre} className="w-10 h-10 object-cover rounded" />
                        <span className="text-white/60 truncate max-w-[200px]">
                          {p.imagen}
                        </span>
                      </div>
                    ) : "-"
                  )}
                </td>
                <td className="py-3 pr-4 whitespace-nowrap">
                  {editingId === p.id ? (
                    <div className="flex gap-2">
                      <button onClick={()=>onSave(p.id)} className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-black font-bold">Guardar</button>
                      <button onClick={onCancel} className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white font-medium">Cancelar</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={()=>onEdit(p)} className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium">Editar</button>
                      <button onClick={()=>onDelete(p.id)} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium">Eliminar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;


