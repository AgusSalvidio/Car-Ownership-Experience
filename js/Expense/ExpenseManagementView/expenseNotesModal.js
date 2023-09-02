export { expenseInfoView };

let expenseInfoView = document.createElement("div");
expenseInfoView.classList.add("modal", "fade");
expenseInfoView.setAttribute("id", "expenseInfoModal");
expenseInfoView.setAttribute("tabindex", "-1");
expenseInfoView.setAttribute("aria-labelledby", "expenseInfoModalLabel");
expenseInfoView.setAttribute("aria-hidden", "true");

expenseInfoView.innerHTML = `<div class="modal-dialog">
   <div class="modal-content">
     <div class="modal-header">
       <h1 class="modal-title fs-5" id="expenseInfoModalLabel">
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
