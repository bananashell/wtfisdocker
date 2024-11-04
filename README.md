![Docker](/docs/images/docker.png)

# WTF is Docker?

> _Docker helps developers build, share, run, and verify applications anywhere — without tedious environment configuration or management._

[www.docker.com](https://www.docker.com)

## Demo

If you want to try out running multiple containers try out the provided example

-   Install [docker](https://www.docker.com/)
-   In your favorite terminal goto `./demo` and run `docker-compose up`
    -   This will look at the `docker-compose.yaml` and spin up all containers that has been specified
        -   Client, a next.js website
        -   Weather-Service, a dotnet api
        -   Superhero-Service, a elysia api
        -   Superhero-DB, a postgres database
    -   Goto http://localhost:3000 to get new weather info on each request
    -   Goto http://localhost:3001/swagger to list and create superheroes

## Container evolution

![Container evolution](/docs/images/container_evolution.png)

First someone wanted to share something that they've built. The only way was to take someones computer and expose it to the internet

When you got a lot of traffic or needed a beefier computer you had to take everything that you had installed and all the configuration and move that to someone elses computer and setup everything again

Along came Virtual Machines, what if you could copy paste your entire server and put that on multiple servers, on the fly make adjustments to how beefy it is. Give it more CPU, Ram or even GPU. So having a test environment and a production environment is easy. Just copy your production VM to a test server and your good to go. Oh man this is easier than having physical servers. When you have some new code to share with the world just replace your binaries on that VM and you're up and running

At first you maybe only have one application and it's specific needs is filled on that virtual machine you copied but hey, a new version of dotnet comes along. You want to use all the new fancy stuff that version provides. Now you have to update your all your virtual machines so that they all have that new version.
A bit tedious but it works, aslong as you don't forget to update that VM running in production. That has happened to me multiple times.

But what if we have multiple requirements, we have a node application and a python application, what if we only want to have that beefy computer at times when demand is high? In comes containers. Containers are to VMs what VMs where to physical servers. Instead of sharing a VM with multiple applications - a container IS the application including it's requirements. Your declaration of requirements lives alongside your code, so when your application needs to upgrade to node@22 or dotnet@9 you just update YOUR code. No upgrading VMs or making sure that you remembered to upgrade the production server. Everything lives inside that container.

## Deployment comparison

```mermaid
flowchart BT;
code(Code)
package(Package/Zip)
registry(Registry npm, nuget, maven)

subgraph .
    codeC(Code)
    reqs(Requirements)
end
dockerImage(Docker Image)
registryC(Container Registry Docker Hub, ACR)

code ---> package --> registry
codeC --- reqs --> dockerImage
dockerImage --> registryC
```

### Without containers

Build the code, package it and push it to a registry. In most cases this can contain executables or just code that some other application can use.

When you deploy this the deploy target is required to match all expectations your code has.
It can be correct runtimes, libs, etc.

### With containers

Instead of bundeling only your code you create a _manifest_, a `Dockerfile`, that contains not only your requirements, OS, libs, runtimes etc, but also your code and optionally _HOW_ to build your code. There's a plethora of prebuilt containers that you can start from. You can find public ones on [Docker Hub](https://hub.docker.com/)

Finally in your Dockerfile you tell Docker what command to run when the container is started.

## Resources

![Comparison](/docs/images/vmvsdocker.png)

### Overhead

-   VMs require a full OS for each instance which leads to higher memory and CPU usage
-   Docker containers share the host OS kernel making them faster and lighter, with less hardware consumption and thus more performant since there is no HyperVisor layer. Thus leading to being capable of running multitudes of applications on equivalent hardware

### Isolation

-   VMs are strictly isolated due to it's nature of being a separate (Guest) OS from the host OS
-   Docker containers use process-level isolation which is less isolated but way more efficient than VMs

### Scalability

-   VMs are slow and clunky to spin up and down and require more resources to scale due to the guest OS.
-   Since Docker containers are so tiny and efficient spinning up or down containers can be done quickly based on load for example

# Competition

Even though docker is the most prominent container solution there are others.

-   [Podman](https://podman.io)
-   [OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift)
