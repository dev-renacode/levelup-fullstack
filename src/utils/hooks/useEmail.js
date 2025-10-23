import { useState } from 'react';
import { sendInvoiceEmail, sendConfirmationEmail, simulateEmailSend, isEmailConfigured } from '../../config/emailService';

/**
 * Hook personalizado para manejar el envío de emails
 * @returns {Object} - Funciones y estados para el envío de emails
 */
export const useEmail = () => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [emailSuccess, setEmailSuccess] = useState(false);

  /**
   * Envía una boleta por email
   * @param {Object} orderData - Datos de la orden
   * @param {string} orderId - ID de la orden
   * @param {string} customerEmail - Email del cliente
   * @returns {Promise<boolean>} - True si se envió correctamente
   */
  const sendInvoice = async (orderData, orderId, customerEmail) => {
    setIsSendingEmail(true);
    setEmailError(null);
    setEmailSuccess(false);

    try {
      let result;
      
      // Verificar si EmailJS está configurado
      if (isEmailConfigured()) {
        // Usar EmailJS real
        result = await sendInvoiceEmail(orderData, orderId, customerEmail);
      } else {
        // Usar simulación para desarrollo
        console.warn('⚠️ EmailJS no está configurado. Usando simulación.');
        result = await simulateEmailSend(orderData, orderId, customerEmail);
      }

      setEmailSuccess(true);
      return result;

    } catch (error) {
      console.error('Error al enviar email:', error);
      setEmailError(error.message);
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  /**
   * Envía un email de confirmación simple
   * @param {Object} orderData - Datos de la orden
   * @param {string} orderId - ID de la orden
   * @param {string} customerEmail - Email del cliente
   * @returns {Promise<boolean>} - True si se envió correctamente
   */
  const sendConfirmation = async (orderData, orderId, customerEmail) => {
    setIsSendingEmail(true);
    setEmailError(null);
    setEmailSuccess(false);

    try {
      let result;
      
      if (isEmailConfigured()) {
        result = await sendConfirmationEmail(orderData, orderId, customerEmail);
      } else {
        result = await simulateEmailSend(orderData, orderId, customerEmail);
      }

      setEmailSuccess(true);
      return result;

    } catch (error) {
      console.error('Error al enviar email de confirmación:', error);
      setEmailError(error.message);
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  /**
   * Limpia los estados de email
   */
  const clearEmailStates = () => {
    setEmailError(null);
    setEmailSuccess(false);
  };

  /**
   * Resetea todos los estados
   */
  const resetEmailStates = () => {
    setIsSendingEmail(false);
    setEmailError(null);
    setEmailSuccess(false);
  };

  return {
    // Estados
    isSendingEmail,
    emailError,
    emailSuccess,
    
    // Funciones
    sendInvoice,
    sendConfirmation,
    clearEmailStates,
    resetEmailStates,
    
    // Utilidades
    isEmailConfigured: isEmailConfigured()
  };
};
