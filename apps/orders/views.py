from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from apps.cart.models import Cart, CartItem
from apps.shipping.models import Shipping
from django.core.mail import send_mail
from apps.product.models import Product


class ListOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            orders = Order.objects.order_by('-date_issued').filter(user=user)
            result = []

            for order in orders:
                item = {}
                item['status'] = order.status
                item['transaction_id'] = order.transaction_id
                item['amount'] = order.amount
                item['shipping_price'] = order.shipping_price
                item['date_issued'] = order.date_issued
                item['address_line_1'] = order.address_line_1
                item['address_line_2'] = order.address_line_2

                result.append(item)
            
            return Response(
                {'orders': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving orders'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user

        try:
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                order = Order.objects.get(user=user, transaction_id=transactionId)
                result = {}
                result['status'] = order.status
                result['transaction_id'] = order.transaction_id
                result['amount'] = order.amount
                result['full_name'] = order.full_name
                result['address_line_1'] = order.address_line_1
                result['address_line_2'] = order.address_line_2
                result['city'] = order.city
                result['state_province_region'] = order.state_province_region
                result['postal_zip_code'] = order.postal_zip_code
                result['country_region'] = order.country_region
                result['telephone_number'] = order.telephone_number
                result['shipping_name'] = order.shipping_name
                result['shipping_time'] = order.shipping_time
                result['shipping_price'] = order.shipping_price
                result['date_issued'] = order.date_issued

                order_items = OrderItem.objects.order_by('-date_added').filter(order=order)
                result['order_items'] = []

                for order_item in order_items:
                    sub_item = {}

                    sub_item['id'] = order_item.product.id
                    sub_item['name'] = order_item.name
                    sub_item['price'] = order_item.price
                    sub_item['count'] = order_item.count
                    sub_item['photo'] = order_item.product.get_thumbnail()

                    result['order_items'].append(sub_item)
                return Response(
                    {'order': result},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Order with this transaction ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order detail'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class CreateOrderView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        tax = 0.21

        shipping_id = str(data['shipping_id'])

        full_name = data['full_name']
        address_line_1 = data['address_line_1']
        address_line_2 = data['address_line_2']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_zip_code = data['postal_zip_code']
        country_region = data['country_region']
        telephone_number = data['telephone_number']
        transaction_id = data['transaction_id']
        total_amount = data['total_amount']
        
        shipping = Shipping.objects.get(id=int(shipping_id))

        shipping_name = shipping.name
        shipping_time = shipping.time_to_delivery
        shipping_price = shipping.price
        
        try:
            order = Order.objects.create(
                user=user,
                transaction_id=transaction_id,
                amount=total_amount,
                full_name=full_name,
                address_line_1=address_line_1,
                address_line_2=address_line_2,
                city=city,
                state_province_region=state_province_region,
                postal_zip_code=postal_zip_code,
                country_region=country_region,
                telephone_number=telephone_number,
                shipping_name=shipping_name,
                shipping_time=shipping_time,
                shipping_price=float(shipping_price)
            )
        except:
            return Response(
                {'error': 'Transaction succeeded but failed to create the order'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        cart = Cart.objects.get(user=user)

        #revisar si usuario tiene items en carrito
        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {'error': 'Need to have items in cart'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        cart_items = CartItem.objects.filter(cart=cart)
            
        for cart_item in cart_items:
            try:
                # agarrar el producto
                product = Product.objects.get(id=cart_item.product.id)

                OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    price=cart_item.product.price,
                    count=cart_item.count
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded and order created, but failed to create an order item'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        try:
            send_mail(
                'Your Order Details',
                'Hey ' + full_name + ','
                + '\n\nWe recieved your order!'
                + '\n\nGive us some time to process your order and ship it out to you.'
                + '\n\nYou can go on your user dashboard to check the status of your order.'
                + '\n\nSincerely,'
                + '\nShop Time',
                'giovanni@openm.us',
                [user.email],
                fail_silently=False
            )
        except:
            return Response(
                {'error': 'Transaction succeeded and order created, but failed to send email'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        try:
            # Vaciar carrito de compras
            CartItem.objects.filter(cart=cart).delete()

            # Actualizar carrito
            Cart.objects.filter(user=user).update(total_items=0)
        except:
            return Response(
                {'error': 'Transaction succeeded and order successful, but failed to clear cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        return Response(
            {'success': 'Transaction successful and order was created'},
            status=status.HTTP_200_OK
        )