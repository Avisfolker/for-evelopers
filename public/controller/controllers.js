app.controller('task1Ctrl', function ($http,$interval,$uibModal)  {
  const vm = this;

  vm.animationsEnabled = true;

  vm.openModal = (emp) => {
    let modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: '/views/modal/employeesEdit.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'vm',
      size: 'lg',
      resolve: {
        emp: () =>{
          return emp;
        }
      }
    });
    modalInstance.result.then( () => { //выполняется после закрытия модального окна
    },  () => {
      vm.getArrayEmployees();
    });

  };



  vm.getArrayEmployees = () => $http.post('/api/getArrayEmployees',{
    }).then( (data) => {
      if (data.status === 200) {
        vm.employees = data.data.data;
      }
      else {
        console.log('Error: '+ data.msg);
      }
    });
  vm.getArrayEmployees();
});

app.controller('ModalInstanceCtrl', function ($http,$interval,$uibModal,emp,$uibModalStack) {
  const vm = this;
  vm.emp = emp;
  vm.ok = () => {

    $http.post('/api/saveArrayEmployees',{
      emp:vm.emp
    }).then( (data) => {
      if (data.status === 200) {
        console.log(data);
        $uibModalStack.dismissAll();

      }
      else {
        console.log('Error: '+ data.msg);
        $uibModalStack.dismissAll();
      }
    });

  };
  vm.cancel = () => {
    $uibModalStack.dismissAll();
  };
});

