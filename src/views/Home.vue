<template>
<div>
  <TestBar/>
  <UserInfo />
</div>
</template>

<script>
  import UserInfo from '../components/user/UserInfo'
  import TestBar from '../components/TestBar'

  export default {
    name: 'Home',

    components: {
      UserInfo,
      TestBar
    }
  }
</script>
