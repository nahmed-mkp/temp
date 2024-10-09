pipeline {
  options {
    ansiColor('xterm')
  }
  agent {
    kubernetes {
      yamlFile 'builder.yaml'
    }
  }
  stages {
    stage('Kaniko Build & Push Image') {
      steps {
        container('kaniko') {
          script {
            sh '''
            /kaniko/executor --dockerfile `pwd`/client.dockerfile \
                             --context `pwd` \
                             --destination=mkpcapacr.azurecr.io/prizm-map-web:latest
            '''
          }
        }
      }
    }
  }
}