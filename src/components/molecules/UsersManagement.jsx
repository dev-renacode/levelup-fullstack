import { useState, useEffect } from "react";
import { getAllUsers, updateUser, updateUserStatus, deleteUser } from "../../config/firestoreService";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await getAllUsers();
      // Ordenar por fecha de creación (más recientes primero)
      const sortedUsers = usersData.sort((a, b) => 
        new Date(b.fechaCreacion?.toDate?.() || b.fechaCreacion || 0) - 
        new Date(a.fechaCreacion?.toDate?.() || a.fechaCreacion || 0)
      );
      setUsers(sortedUsers);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser({
      ...user,
      // Asegurar que tenemos los campos necesarios
      nombreCompleto: user.nombreCompleto || user.fullName || "",
      email: user.email || "",
      fechaNacimiento: user.fechaNacimiento || "",
      run: user.run || "",
      rol: user.rol || user.role || "usuario"
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const userData = {
        nombreCompleto: selectedUser.nombreCompleto,
        email: selectedUser.email,
        fechaNacimiento: selectedUser.fechaNacimiento,
        run: selectedUser.run,
        rol: selectedUser.rol
      };

      await updateUser(selectedUser.id, userData);
      
      // Actualizar el estado local
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id
            ? { ...user, ...userData }
            : user
        )
      );
      
      setShowEditModal(false);
      setSelectedUser(null);
      showNotification("Usuario actualizado correctamente", "success");
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      showNotification("Error al actualizar el usuario", "error");
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [userId]: true }));
      const newStatus = currentStatus === "activo" ? "inactivo" : "activo";
      await updateUserStatus(userId, newStatus);
      
      // Actualizar el estado local
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? { ...user, estado: newStatus }
            : user
        )
      );
      
      showNotification(`Usuario ${newStatus === "activo" ? "activado" : "desactivado"} correctamente`, "success");
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      showNotification("Error al actualizar el estado", "error");
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setDeletingUser(userId);
      await deleteUser(userId);
      
      // Remover del estado local
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      showNotification("Usuario eliminado correctamente", "success");
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      showNotification("Error al eliminar el usuario", "error");
    } finally {
      setDeletingUser(null);
    }
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 font-bold animate-slide-in ${
      type === "success" ? "bg-green-500 text-black" : "bg-red-500 text-white"
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const formatDate = (date) => {
    if (!date) return "No disponible";
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (estado) => {
    const isActive = estado === "activo" || !estado; // Si no tiene estado, considerar activo por defecto
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
        isActive
          ? 'bg-green-500/20 text-green-400 border-green-400/30'
          : 'bg-red-500/20 text-red-400 border-red-400/30'
      }`}>
        {isActive ? 'Activo' : 'Inactivo'}
      </span>
    );
  };

  const getRoleBadge = (rol) => {
    const role = rol || "usuario";
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
        role === "admin"
          ? 'bg-purple-500/20 text-purple-400 border-purple-400/30'
          : 'bg-blue-500/20 text-blue-400 border-blue-400/30'
      }`}>
        {role === "admin" ? "Administrador" : "Usuario"}
      </span>
    );
  };

  // Icono de lápiz
  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );

  // Icono de basurero
  const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  );

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={loadUsers} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-white mb-2">Gestión de Usuarios</h1>
        <p className="text-gray-300">Administra y gestiona todos los usuarios del sistema</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">{users.length}</div>
          <div className="text-sm text-gray-400">Total de Usuarios</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {users.filter(u => u.estado === "activo" || !u.estado).length}
          </div>
          <div className="text-sm text-gray-400">Activos</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-red-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {users.filter(u => u.estado === "inactivo").length}
          </div>
          <div className="text-sm text-gray-400">Inactivos</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-purple-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {users.filter(u => (u.rol || u.role) === "admin").length}
          </div>
          <div className="text-sm text-gray-400">Administradores</div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      {users.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-12 max-w-md mx-auto">
            <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-white text-2xl font-bold mb-4">No hay usuarios</h3>
            <p className="text-gray-400">Aún no se han registrado usuarios en el sistema</p>
          </div>
        </div>
      ) : (
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50 border-b border-green-400/30">
                <tr>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Nombre</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Email</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Rol</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Estado</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Fecha Registro</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-green-400/10 hover:bg-green-400/5 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-white font-[Roboto] font-medium">
                      {user.nombreCompleto || user.fullName || "Sin nombre"}
                    </td>
                    <td className="py-4 px-6 text-white/80 font-[Roboto]">
                      {user.email}
                    </td>
                    <td className="py-4 px-6">
                      {getRoleBadge(user.rol || user.role)}
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(user.estado)}
                    </td>
                    <td className="py-4 px-6 text-white/60 font-[Roboto] text-sm">
                      {formatDate(user.fechaCreacion)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-400 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                          title="Editar usuario"
                        >
                          <EditIcon />
                          <span className="text-sm">Editar</span>
                        </button>
                        
                        {/* Switch de Estado */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={user.estado === "activo" || !user.estado}
                            onChange={() => handleToggleStatus(user.id, user.estado || "activo")}
                            disabled={updatingStatus[user.id]}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          <span className="ml-3 text-sm text-white/70">
                            {updatingStatus[user.id] ? "..." : ""}
                          </span>
                        </label>

                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={deletingUser === user.id}
                          className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-400 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Eliminar usuario"
                        >
                          {deletingUser === user.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                          ) : (
                            <TrashIcon />
                          )}
                          <span className="text-sm">Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-green-400/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-[Orbitron]">
                  Editar Usuario
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={selectedUser.nombreCompleto || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, nombreCompleto: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedUser.email || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={selectedUser.fechaNacimiento || ""}
                      onChange={(e) => setSelectedUser({ ...selectedUser, fechaNacimiento: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      RUN
                    </label>
                    <input
                      type="text"
                      value={selectedUser.run || ""}
                      onChange={(e) => setSelectedUser({ ...selectedUser, run: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rol
                  </label>
                  <select
                    value={selectedUser.rol || "usuario"}
                    onChange={(e) => setSelectedUser({ ...selectedUser, rol: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-green-400/30 rounded-lg text-white focus:outline-none focus:border-green-400 transition-colors"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedUser(null);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;

