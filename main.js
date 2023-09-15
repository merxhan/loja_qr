
let arrayLojas = [];

$(function () {

    var form = $('.form'),
        cache_width = form.width(),
        a4 = [595.28, 841.89]; // for a4 size paper width and height  

    $('#btn_pdf').click(function () {
        $('body').scrollTop(0);
        arrayLojas.forEach(item => {
            $('#lbl_cnpj_1').text(`CNPJ: ${item.cnpj}`);
            $('#lbl_cnpj_2').text(`CNPJ: ${item.cnpj}`);   
            createPDF();     
        });
    });

    function createPDF() {
        getCanvas().then(function (canvas) {
            var img = canvas.toDataURL("image/png"),
                doc = new jsPDF({
                    unit: 'px',
                    format: 'a4'
                });
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save(`${$('#txt_ref').val()}.pdf`);
            form.width(cache_width);
        });
    }

    function getCanvas() {
        form.width((a4[0] * 1.33333 - 50)).css('max-width', 'none');
        return html2canvas(form, {
            imageTimeout: 2000,
            removeContainer: true
        });
    }

});

$('#btn_generar').click(function () {

    arrayLojas = [];

    if ($('#chk_1').is(':checked'))
        arrayLojas.push({ loja: 1, cnpj: '08.503.800/0001-37' }); // LittleFante

    if ($('#chk_2').is(':checked'))
        arrayLojas.push({ loja: 2, cnpj: '03.537.913/0001-30' }); // Isabella Baby

    if ($('#chk_3').is(':checked'))
        arrayLojas.push({ loja: 3, cnpj: '23.751.668/0001-76' }); // Caraminholas

    if ($('#chk_4').is(':checked'))
        arrayLojas.push({ loja: 4, cnpj: '08.401673/0001-65' }); // Sapituca

    if ($('#chk_5').is(':checked'))
        arrayLojas.push({ loja: 5, cnpj: '44.138.960/0001-98' }); // NT

    arrayLojas.forEach(item => {

        $('#lbl_cnpj_1').text(`CNPJ: ${item.cnpj}`);
        $('#lbl_cnpj_2').text(`CNPJ: ${item.cnpj}`);

        $('#lbl_ref_1').text(`REF: ${$('#txt_ref').val()}`);
        $('#lbl_ref_2').text(`REF: ${$('#txt_ref').val()}`);

        document.querySelector("#lbl_detail").innerText = $('#txt_detail').val();

    });

});

document.querySelector("#file_qr").addEventListener("change", imgQR);

function imgQR() {

    if (!this.files || !this.files[0]) return;

    const FR = new FileReader();

    FR.addEventListener("load", function (evt) {
        document.querySelector("#img_qr").src = evt.target.result;
    });

    FR.readAsDataURL(this.files[0]);

}
