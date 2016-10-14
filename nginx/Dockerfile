FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/

# Append "daemon off;" to the beginning of the configuration
# in order to avoid an exit of the container
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80 5000

CMD service nginx restart