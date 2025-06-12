FROM node:22

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

WORKDIR /workspace

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

ENTRYPOINT ["tail", "-f", "/dev/null"]