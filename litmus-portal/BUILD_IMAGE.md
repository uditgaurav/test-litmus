# How to Build LitmusPortal Docker Images?

The litmusportal runs on top of Kubernetes and is built on a set of docker containers it provides you the flexibility to build a custom image to visualize/check
your changes. Here are the components for which you can create your custom Docker images from this repository:
- GraphQL Server
- Cluster Agents:  Subscriber, Event Tracker
- Web UI (Frontend)

Follow the given steps to build a custom docker images:

**Clone litmus repository**

- We need to clone (forked or base) litmus repository and make the required changes (if any). 

```bash
git clone http://github.com/litmuschaos/litmus
cd litmus/litmus-portal
```

- The litmus portal component also supports the multiarch builds that is the builds on different `OS` and `ARCH`. Currently the images are tested to be working
  for `linux/amd64` and `linux/arm64`builds.


## Docker Image Build Tunables

<table>
  <tr>
    <th>  Variables </th>
    <th>  Description </th>
    <th> Example </th>
  </tr>
  <tr>
    <td> REPONAME </td>
    <td> Provide the DockerHub user/organisation name of the image. </td>
    <td> <code>REPONAME=example-repo-name</code> <br> used as <code>example-repo-name/litmusportal-server:ci</code></td>
  </tr>
  <tr>
    <td> IMAGE_NAME </td>
    <td> Provide the custom image name for the specific component. </td>
    <td> <code>IMAGE_NAME=example-image-name</code> <br> used as <code>litmuschaos/example-image-name:ci</code></td>
  </tr>
  <tr>
    <td> IMAGE_TAG </td>
    <td> Provide the custom image tag for the specific build. </td>
    <td> <code>IMAGE_TAG=example-tag</code> <br> used as <code>litmuschaos/litmusportal-server:example-tag</code></td>
  </tr>
  <tr>
    <td> PLATFORMS </td>
    <td> Provide the target platforms for the image as CSV. <br>The tested ones are <code>linux/amd64</code> and <code>linux/arm64</code> </td>
    <td> <code>PLATFORMS=linux/amd64,linux/arm64</code></td>
  </tr>
  <tr>
    <td> DIRECTORY </td>
    <td> Provide the directory according to the component directory structure. </td>
    <td>  Different <code>DIRECTORY</code> values are:<br>
         <li> <b>GraphQL Server:</b> "graphql-server" <br>
         <li> <b>Subscriber:</b> "cluster-agents/subscriber" <br>
         <li> <b>Event Tracker:</b> "cluster-agents/event-tracker" <br> 
         <li> <b>Frontend:</b> N/A</td>
  </tr>    
</table>



**_For AMD64 Build_**
