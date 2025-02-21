import { createRouter, createWebHistory } from 'vue-router'
import ScheduleView from '../views/ScheduleView.vue'
import DirectoryView from '../views/DirectoryView.vue'
import LabView from '../views/LabView.vue'
import DetailView from '../views/DetailView.vue'
import MoreInfoView from '../views/MoreInfoView.vue'
import ReimbursementPDFView from '../views/ReimbursementPDFView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'schedule',
      component: ScheduleView
    },
    {
      path: '/schedule/:day_key',
      name: 'schedule-event',
      component: ScheduleView
    },
    {
      path: '/directory',
      name: 'directory',
      component: DirectoryView
    },
    {
      path: '/directory/:prof_key',
      name: 'directory-details',
      component: DetailView
     },
    {
      path: '/labs',
      name: 'labs',
      component: LabView
    },
    {
      path: '/labs/:lab_key',
      name: 'lab-details',
      component: DetailView
    },
    {
      path: '/more-info',
      name: 'more-info',
      component: MoreInfoView
    },
    {
      path: '/more-info/reimbursement',
      name: 'reimbursement',
      component: ReimbursementPDFView
    }
  ]
})

export default router
