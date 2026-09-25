let planActualPrecio = 3;

function seleccionarPlan(tipo, precio) {
    planActualPrecio = precio;
    document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('card-' + tipo).classList.add('selected');

    document.getElementById('selected-plan-text').innerText = `Plan seleccionado (${tipo.toUpperCase()}): $${precio}`;
    document.getElementById('payment-box').style.display = 'flex';
    document.getElementById('payment-details').style.display = 'none';
    actualizarEnlaceCorreo();
}

function actualizarEnlaceCorreo() {
    const correoDestino = "tucorreo@domain.com"; // Reemplaza con tu correo real
    const emailInput = document.getElementById('userEmail').value || "cliente@correo.com";
    const asunto = encodeURIComponent("Comprobante de Pago - OptimaAi PRO");
    const cuerpo = encodeURIComponent(`Hola, acabo de realizar el pago de $${planActualPrecio} para OptimaAi PRO.\n\nMi correo es: ${emailInput}\n\nAdjunto mi comprobante de pago para que me envíen mi código de activación individual.`);

    document.getElementById('btn-email-request').href = `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`;
}

// Escuchar cambios en el input de correo
document.getElementById('userEmail').addEventListener('input', actualizarEnlaceCorreo);

function mostrarDatosBanesco() {
    const box = document.getElementById('payment-details');
    box.style.display = 'block';
    box.innerHTML = `<b>Banesco Panamá:</b><br>• Titular: Administrador<br>• Cuenta: 0123-XXXX-XXXXXXXX<br>• Monto exacto: $${planActualPrecio}.00`;
}

function mostrarDatosBinance() {
    const box = document.getElementById('payment-details');
    box.style.display = 'block';
    box.innerHTML = `<b>Binance Pay (USDT):</b><br>• Email: correo@binance.com<br>• Pay ID: 123456789<br>• Monto exacto: $${planActualPrecio}.00 USDT`;
}

function validarCodigoIndividual() {
    const codigoInput = document.getElementById('activationCode').value.trim();

    // Lista de tus códigos individuales únicos
    const codigosUnicosIndividuales = ["OPT-1942-A", "OPT-5583-B", "OPT-9921-C"];

    if (codigosUnicosIndividuales.includes(codigoInput)) {
        esUsuarioPro = true;
        document.getElementById('status-badge').innerText = "PRO 👑";
        document.getElementById('status-badge').style.background = "rgba(245, 158, 11, 0.15)";
        document.getElementById('status-badge').style.color = "var(--warning)";

        document.getElementById('view-pro').innerHTML = `
            <div class="card" style="text-align: center; padding: 30px 16px;">
                <span class="badge-pro" style="margin: 0 auto 12px auto;">👑 ACCESO ACTIVO</span>
                <h2 style="font-size: 1.2rem; margin-bottom: 8px;">¡Bienvenido a OptimaAi PRO!</h2>
                <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">Código individual validado con éxito. Disfruta de tu experiencia avanzada.</p>
            </div>
        `;
    } else {
        const contenedorPadre = document.getElementById('activationCode').parentElement.parentElement;
        const errorPrevio = contenedorPadre.querySelector('.error-msg');
        if (errorPrevio) errorPrevio.remove();

        const aviso = document.createElement('div');
        aviso.style.color = "#f87171";
        aviso.style.fontSize = "0.75rem";
        aviso.style.marginTop = "6px";
        aviso.className = "error-msg";
        aviso.innerText = "❌ Código individual no válido o ya utilizado.";

        contenedorPadre.appendChild(aviso);
    }
}


