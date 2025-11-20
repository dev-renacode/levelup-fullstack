import { useState, useEffect } from "react";
import { getAllContacts, updateContactStatus } from "../../config/firestoreService";

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const contactsData = await getAllContacts();
      // Ordenar por fecha de creación (más recientes primero)
      const sortedContacts = contactsData.sort((a, b) => 
        new Date(b.fechaCreacion?.toDate?.() || b.fechaCreacion) - new Date(a.fechaCreacion?.toDate?.() || a.fechaCreacion)
      );
      setContacts(sortedContacts);
    } catch (err) {
      console.error("Error al cargar contactos:", err);
      setError("Error al cargar los contactos");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (contact) => {
    setSelectedContact(contact);
    setShowStatusModal(true);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedContact) return;

    try {
      setUpdatingStatus(true);
      await updateContactStatus(selectedContact.id, newStatus);
      
      // Actualizar el estado local
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === selectedContact.id
            ? { ...contact, estado: newStatus }
            : contact
        )
      );
      
      setShowStatusModal(false);
      setSelectedContact(null);
      
      showNotification("Estado actualizado correctamente", "success");
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      showNotification("Error al actualizar el estado", "error");
    } finally {
      setUpdatingStatus(false);
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
    if (!date) return "Fecha no disponible";
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'respondido':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'visto':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getStatusText = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'respondido':
        return 'Respondido';
      case 'visto':
        return 'Visto';
      default:
        return estado || 'Pendiente';
    }
  };

  // Icono de ojo
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  // Icono de actualizar
  const UpdateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    </svg>
  );

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando contactos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-400 text-lg">{error}</p>
          <button 
            onClick={loadContacts} 
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
        <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-white mb-2">Gestión de Contactos</h1>
        <p className="text-gray-300">Administra y gestiona todos los mensajes de contacto</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">{contacts.length}</div>
          <div className="text-sm text-gray-400">Total de Contactos</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-yellow-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {contacts.filter(c => c.estado === 'pendiente' || !c.estado).length}
          </div>
          <div className="text-sm text-gray-400">Pendientes</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {contacts.filter(c => c.estado === 'respondido').length}
          </div>
          <div className="text-sm text-gray-400">Respondidos</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-xl p-4">
          <div className="text-2xl font-bold font-[Orbitron] text-white">
            {contacts.filter(c => c.estado === 'visto').length}
          </div>
          <div className="text-sm text-gray-400">Vistos</div>
        </div>
      </div>

      {/* Tabla de contactos */}
      {contacts.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-12 max-w-md mx-auto">
            <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-white text-2xl font-bold mb-4">No hay contactos</h3>
            <p className="text-gray-400">Aún no se han recibido mensajes de contacto</p>
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
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Fecha</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Estado</th>
                  <th className="text-left text-white/70 text-sm font-[Roboto] py-4 px-6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-green-400/10 hover:bg-green-400/5 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-white font-[Roboto] font-medium">
                      {contact.nombreCompleto || contact.fullName || "Sin nombre"}
                    </td>
                    <td className="py-4 px-6 text-white/80 font-[Roboto]">
                      {contact.email}
                    </td>
                    <td className="py-4 px-6 text-white/60 font-[Roboto] text-sm">
                      {formatDate(contact.fechaCreacion)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(contact.estado)}`}>
                        {getStatusText(contact.estado)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(contact)}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-400 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                          title="Ver detalle"
                        >
                          <EyeIcon />
                          <span className="text-sm">Ver</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(contact)}
                          className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-400 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
                          title="Actualizar estado"
                        >
                          <UpdateIcon />
                          <span className="text-sm">Estado</span>
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

      {/* Modal de Detalles */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-green-400/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-[Orbitron]">
                  Detalles del Contacto
                </h2>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedContact(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                  <h3 className="text-green-400 font-bold mb-3">Información del Contacto</h3>
                  <div className="space-y-2">
                    <p className="text-white text-sm">
                      <span className="text-gray-400">Nombre:</span> {selectedContact.nombreCompleto || selectedContact.fullName || "Sin nombre"}
                    </p>
                    <p className="text-white text-sm">
                      <span className="text-gray-400">Email:</span> {selectedContact.email}
                    </p>
                    <p className="text-white text-sm">
                      <span className="text-gray-400">Fecha:</span> {formatDate(selectedContact.fechaCreacion)}
                    </p>
                    <p className="text-white text-sm">
                      <span className="text-gray-400">Estado:</span>{" "}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedContact.estado)}`}>
                        {getStatusText(selectedContact.estado)}
                      </span>
                    </p>
                    {selectedContact.idUsuario && (
                      <p className="text-white text-sm">
                        <span className="text-gray-400">ID Usuario:</span> {selectedContact.idUsuario}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                  <h3 className="text-green-400 font-bold mb-3">Mensaje</h3>
                  <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedContact.contenido || selectedContact.content}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedContact(null);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Actualizar Estado */}
      {showStatusModal && selectedContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/95 border border-green-400/30 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-[Orbitron]">
                  Actualizar Estado
                </h2>
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedContact(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-300 mb-4">
                  Contacto: <span className="text-white font-bold">{selectedContact.nombreCompleto || selectedContact.fullName || "Sin nombre"}</span>
                </p>
                <p className="text-gray-300 mb-4">
                  Estado actual: <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedContact.estado)}`}>
                    {getStatusText(selectedContact.estado)}
                  </span>
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleStatusChange('pendiente')}
                  disabled={updatingStatus || selectedContact.estado === 'pendiente'}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedContact.estado === 'pendiente'
                      ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-400'
                      : 'bg-black/50 border-yellow-400/30 text-white hover:bg-yellow-500/20 hover:border-yellow-400/50'
                  } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold">Pendiente</div>
                  <div className="text-sm text-gray-400">El mensaje está pendiente de revisión</div>
                </button>

                <button
                  onClick={() => handleStatusChange('visto')}
                  disabled={updatingStatus || selectedContact.estado === 'visto'}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedContact.estado === 'visto'
                      ? 'bg-blue-500/20 border-blue-400/50 text-blue-400'
                      : 'bg-black/50 border-blue-400/30 text-white hover:bg-blue-500/20 hover:border-blue-400/50'
                  } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold">Visto</div>
                  <div className="text-sm text-gray-400">El mensaje ha sido visto</div>
                </button>

                <button
                  onClick={() => handleStatusChange('respondido')}
                  disabled={updatingStatus || selectedContact.estado === 'respondido'}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    selectedContact.estado === 'respondido'
                      ? 'bg-green-500/20 border-green-400/50 text-green-400'
                      : 'bg-black/50 border-green-400/30 text-white hover:bg-green-500/20 hover:border-green-400/50'
                  } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold">Respondido</div>
                  <div className="text-sm text-gray-400">El mensaje ha sido respondido</div>
                </button>
              </div>

              {updatingStatus && (
                <div className="text-center mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400 mx-auto"></div>
                  <p className="text-gray-400 text-sm mt-2">Actualizando estado...</p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedContact(null);
                  }}
                  disabled={updatingStatus}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;

