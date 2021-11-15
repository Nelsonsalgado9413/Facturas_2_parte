var UrlGetFacturas ='http://localhost:80/G1_20/controller/facturas.php?op=GetFacturas';
var UrlPostFacturas='http://localhost:80/G1_20/controller/facturas.php?op=InsertFacturas';
var UrlGetUno='http://localhost:80/G1_20/controller/facturas.php?op=GetUno';
var UrlPutFactura='http://localhost:80/G1_20/controller/facturas.php?op=UpdateFacturas';
var UrlDeleteFactura='http://localhost:80/G1_20/controller/facturas.php?op=DeleteFacturas';

$(document).ready(function(){
    CargarFacturas();
});

function CargarFacturas(){
    $.ajax({
        url: UrlGetFacturas,
        type: 'GET',
        datatype: 'JASON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-info" onclick="CargarFactura('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarFactura('+ MiItems[i].ID +')">Eliminar</button>'+
                '<td>'+
                '<tr>';
                $('.facturas').html(Valores);
            }
        }
    });
}

function AgregarFactura(){
    var datofactura ={
    NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
    ID_SOCIO:$('#ID_SOCIO').val(),
    FECHA_FACTURA:$('#FECHA_FACTURA').val(),
    DETALLE:$('#DETALLE').val(),
    SUB_TOTAL:$('#SUB_TOTAL').val(),
    TOTAL_ISV:$('#TOTAL_ISV').val(),
    TOTAL:$('#TOTAL').val(),
    FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val()
    };
    var datosfacturajson= JSON.stringify(datofactura);
    $.ajax({
        url: UrlPostFacturas,
        type: 'POST',
        data:datosfacturajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Agregada Con Exito")
}

function CargarFactura(idfactura){
    var datosfactura = {
        ID: idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data:datosfacturajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response){
            var MiItems = response;
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+ MiItems[0].ID +')"'+
            'value="Actualizar Factura" class= "btn btn-primary"></input'+
            '<br>'+
            '<label for="">ESTADO</label>'+
            '<input type="text" id="ESTADO" class="form-control" placeholder="Ingrese el estado">';
            $('.btnagregar').html(btnactualizar);
            $('#ESTADO').val(MiItems[0].ESTADO);
        }
    });
}

function ActualizarFactura(idfactura){
    var datosfactura = {
        ID: idfactura,
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPutFactura,
        type: 'PUT',
        data:datosfacturajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
            
        }
    });
    alert("Factura Actualizada con Exito")
}

function EliminarFactura(idfactura){
    var datosfactura = {
        ID: idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: UrlDeleteFactura,
        type: 'DELETE',
        data:datosfacturajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
            
        }
    });
    alert("Factura Eliminada con Exito")

}