<template>
 <div class="my-wrapper">
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <my-button class="my-button" label="This is my button component"></my-button>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          tag="a"
          :href="link.link"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-xl">
        <!-- Your existing button -->
        <div class="q-mb-xl">
          <q-btn 
            :label="buttonLabel" 
            icon="ads_click" 
            color="primary"
            @click="showCustomNotification"
          />
        </div>
        
        <q-separator spaced />
        
        <!-- Dialog Test Section -->
        <div class="q-mt-xl">
          <h5 class="text-h5 q-mb-md">Dialog Test Section</h5>
          
          <div class="row q-gutter-md q-mb-xl">
            <q-btn 
              label="Open Custom Dialog" 
              color="primary" 
              icon="dialog"
              @click="customDialogVisible = true"
            />
            
            <q-btn 
              label="Basic Dialog" 
              color="secondary" 
              icon="question_answer"
              @click="showBasicDialog"
            />
            
            <q-btn 
              label="Alert Dialog" 
              color="warning" 
              icon="warning"
              @click="showAlertDialog"
            />
            
            <q-btn 
              label="Confirm Dialog" 
              color="info" 
              icon="help"
              @click="showConfirmDialog"
            />
            
            <q-btn 
              label="Prompt Dialog" 
              color="accent" 
              icon="edit"
              @click="showPromptDialog"
            />
          </div>

          <!-- Results display -->
          <q-card v-if="lastDialogResult" flat bordered class="q-mt-md">
            <q-card-section>
              <div class="text-h6">Last Dialog Result:</div>
              <pre class="bg-grey-2 q-pa-md rounded-borders">{{ lastDialogResult }}</pre>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
      <router-view />
    </q-page-container>

    <!-- Custom Dialog Component (inline) -->
    <q-dialog v-model="customDialogVisible" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Custom Dialog by Khashayar</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>This is a dialog created with web components!</p>
          
          <q-input
            v-model="dialogInput"
            label="Enter something"
            outlined
            dense
            class="q-mt-md"
          />
          
          <q-toggle
            v-model="dialogOption"
            label="Enable option"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-section class="row justify-end q-gutter-sm">
          <q-btn label="Cancel" color="grey" flat v-close-popup />
          <q-btn label="Submit" color="primary" @click="submitCustomDialog" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout></div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const leftDrawerOpen = ref(false)
const customDialogVisible = ref(false)
const dialogInput = ref('')
const dialogOption = ref(false)
const buttonLabel = ref('this is a button made by Khashayar with web component')
const lastDialogResult = ref(null)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function showCustomNotification() {
  $q.notify({
    type: 'positive',
    message: 'Button clicked by Khashayar!',
    position: 'top',
    actions: [
      { label: 'OK', color: 'white', handler: () => { console.log('OK clicked') } }
    ]
  })
}

function submitCustomDialog() {
  const result = {
    type: 'custom',
    input: dialogInput.value,
    option: dialogOption.value,
    timestamp: new Date().toLocaleString()
  }
  
  lastDialogResult.value = result
  
  $q.notify({
    type: 'positive',
    message: 'Custom dialog submitted!',
    caption: `Input: ${dialogInput.value || '(empty)'}`,
    position: 'top'
  })
  
  // Reset form
  dialogInput.value = ''
  dialogOption.value = false
}

function showBasicDialog() {
  $q.dialog({
    title: 'Basic Dialog',
    message: 'This is a simple dialog with just an OK button.',
    ok: 'Got it'
  }).onOk(() => {
    lastDialogResult.value = { type: 'basic', action: 'ok' }
    $q.notify('Basic dialog closed')
  })
}

function showAlertDialog() {
  $q.dialog({
    title: 'Alert',
    message: 'This is an important alert message!',
    ok: {
      label: 'Acknowledge',
      color: 'warning',
      flat: true
    }
  }).onOk(() => {
    lastDialogResult.value = { type: 'alert', action: 'acknowledged' }
    $q.notify({
      type: 'warning',
      message: 'Alert acknowledged'
    })
  })
}

function showConfirmDialog() {
  $q.dialog({
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    lastDialogResult.value = { type: 'confirm', action: 'confirmed' }
    $q.notify({
      type: 'positive',
      message: 'Action confirmed!'
    })
  }).onCancel(() => {
    lastDialogResult.value = { type: 'confirm', action: 'cancelled' }
    $q.notify({
      type: 'info',
      message: 'Action cancelled'
    })
  })
}

function showPromptDialog() {
  $q.dialog({
    title: 'Enter Information',
    message: 'Please enter your name:',
    prompt: {
      model: '',
      type: 'text',
      isValid: val => val.length > 0,
      outlined: true
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    lastDialogResult.value = { type: 'prompt', data, action: 'submitted' }
    $q.notify({
      type: 'positive',
      message: `Hello, ${data}!`
    })
    
    // Update button label
    buttonLabel.value = `Hello, ${data}!`
  }).onCancel(() => {
    lastDialogResult.value = { type: 'prompt', action: 'cancelled' }
    $q.notify('Prompt cancelled')
  }).onDismiss(() => {
    console.log('Dialog dismissed')
  })
}
</script>

<style scoped>
.q-pa-xl {
  max-width: 1200px;
  margin: 0 auto;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
}
</style>