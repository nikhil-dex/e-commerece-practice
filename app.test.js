let Storage = "storage"
let Acl = "acl"
let Iam = "iam"
let shapeMode = "shapeMode"
let kCapture = "kCapture"


const files =[
  {
    fieldname: 'image',
    originalname: 'brucelee.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    fileRef: {
      _events: "sv",
      _eventsCount: 0,
      _maxListeners: undefined,
      metadata: [Object],
      baseUrl: '/o',
      parent: "svs",
      id: 'brucelee1981f010857.jpg',
      createMethod: undefined,
      methods: "svs",
      interceptors: [],
      projectId: undefined,
      create: undefined,
      bucket: "csc",
      storage: [Storage],
      kmsKeyName: undefined,
      userProject: undefined,
      name: 'brucelee1981f010857.jpg',
      acl: [Acl],
      instanceRetryValue: true,
      instancePreconditionOpts: undefined,
      [Symbol(shapeMode)]: false,
      [Symbol(kCapture)]: false
    },
    path: 'brucelee1981f010857.jpg',
    bucket: 'project-1-e0088.firebasestorage.app',
    bucketRef:{
      _events: "svs",
      _eventsCount: 0,
      _maxListeners: undefined,
      metadata: {},
      baseUrl: '/b',
      parent: [Storage],
      id: 'project-1-e0088.firebasestorage.app',
      createMethod: "svs",
      methods: [Object],
      interceptors: [],
      projectId: undefined,
      name: 'project-1-e0088.firebasestorage.app',
      storage: [Storage],
      userProject: undefined,
      acl: [Acl],
      iam: [Iam],
      getFilesStream: "acs",
      instanceRetryValue: true,
      instancePreconditionOpts: undefined,
      [Symbol(shapeMode)]: false,
      [Symbol(kCapture)]: false
    },
    isPublictrue: true,
    publicUrl: 'https://storage.googleapis.com/project-1-e0088.firebasestorage.app/brucelee1981f010857.jpg'
  }
]

files.forEach(value=> console.log(value.publicUrl))