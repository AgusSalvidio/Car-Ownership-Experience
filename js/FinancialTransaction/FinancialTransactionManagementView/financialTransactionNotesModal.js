export { financialTransactionInfoView };

let financialTransactionInfoView = document.createElement("div");
financialTransactionInfoView.classList.add("modal", "fade");
financialTransactionInfoView.setAttribute(
  "id",
  "financialTransactionInfoModal"
);
financialTransactionInfoView.setAttribute("tabindex", "-1");
financialTransactionInfoView.setAttribute(
  "aria-labelledby",
  "financialTransactionInfoModalLabel"
);
financialTransactionInfoView.setAttribute("aria-hidden", "true");

financialTransactionInfoView.innerHTML = `<div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="financialTransactionInfoModalLabel">
       </h1>
       <button
         type="button"
         class="btn-close"
         data-bs-dismiss="modal"
         aria-label="Close"
       ></button>
     </div>
     <div class="modal-body">
     <div class="container-fluid">
         <div class="mb-3">
           <textarea disabled rows="4" cols="54" name="notesModal" id="notesModal"></textarea>
         </div>
       </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
         Cerrar
       </button>
     </div>
   </div>
 </div>
   `;
