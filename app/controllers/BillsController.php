<?php
/**
 * @link http://hocmai.vn/
 * @copyright Cong ty CP Dau tu va dich vu Giao duc
 * @license http://hocmai.vn/
 */
/**
 *
 * @author Thai Bui - Created At: 10/22/2019 - 11:35 AM
 * @version 1.0.0
 *
 */
use JasonGrimes\Paginator;
use Phalcon\Mvc\Model\Query\Builder;
use Phalcon\Mvc\View;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
class BillsController extends \ControllerBase
{
  public function initialize()
  {

    parent::initialize();
        //addcss
    $this->assets->addCss('css/style.css');
    $this->assets->addCss('assets/icon/material-design/css/material-design-iconic-font.min.css');
    $this->assets->addCss('assets/icon/themify-icons/themify-icons.css');
    $this->assets->addCss('assets/icon/icofont/css/icofont.css');
    $this->assets->addCss('assets/icon/font-awesome/css/font-awesome.min.css');
    $this->assets->addCss('assets/pages/advance-elements/css/bootstrap-datetimepicker.css');
    $this->assets->addCss('bower_components/bootstrap-daterangepicker/css/daterangepicker.css');
    $this->assets->addCss('bower_components/select2/css/select2.min.css');
    $this->assets->addCss('bower_components/bootstrap-multiselect/css/bootstrap-multiselect.css');
    $this->assets->addCss('bower_components/multiselect/css/multi-select.css');
    $this->assets->addCss('assets/css/ukflex.css');

         //add js
    $this->assets->addJs('bower_components/bootstrap-daterangepicker/js/daterangepicker.js');
    $this->assets->addJs('bower_components/bootstrap-datepicker/js/bootstrap-datepicker.min.js');
    $this->assets->addJs('bower_components/select2/js/select2.full.min.js');
    $this->assets->addJs('bower_components/bootstrap-multiselect/js/bootstrap-multiselect.js');
    $this->assets->addJs('bower_components/multiselect/js/jquery.multi-select.js');
    $this->assets->addJs('assets/pages/advance-elements/select2-custom.js');
    $this->assets->addJs('assets/pages/form-validation/validate.js');
    $this->assets->addJs('js/myjs.js');
    $this->assets->addJs('assets/js/update.js');
    $this->assets->addJs('js/datepicker.js');


        //them css hoac js ma xu ly rieng (do minh viet hoac tu thu vien) cho tung trang vao day (neu can thiet)
  }

  public function indexAction()
  {
    $teachers = Teacher::find();
    $group_ids = BookGroup::find();
    $book = Book::find();
    $group_id = $this->request->getQuery('group_id');
    $name = $this->request->getQuery('name');
    $created_by = $this->request->getQuery('created_by');
    $startDate = $this->request->getQuery('startDate');
    $endDate =$this->request->getQuery('endDate');
    if (!empty($startDate)){
      $fomatstart = date_create_from_format('Y-m-d H:i:s', $startDate . ' 00:00:00')->getTimestamp();
    }
    if (!empty($endDate)){
      $fomatend = date_create_from_format('Y-m-d H:i:s', $endDate . ' 23:59:59')->getTimestamp();
    }

        $currentPage = (int) $this->request->getQuery('page', 'int'); // GET
        $w = '';
        if (!empty($group_id)) {
          $w .= ' AND group_id = '.$group_id.'';
        }
        if (!empty($name)) {
          $w .= ' AND book.name like "%'.$name.'%"';
        }
        if (isset($created_by) && $created_by != ""){
          $w .= ' AND bills.created_by = "'.$created_by.'"';
        }
        if (!empty($startDate)) {
          $w .= ' AND UNIX_TIMESTAMP(bills.created_at) >=  '.$fomatstart.'';
        }
        if (!empty($endDate)) {
          $w .= ' AND UNIX_TIMESTAMP(bills.created_at) <= '.$fomatend.'';
        }

        $pages = $currentPage ? $currentPage : 1;
        $off = ($pages -1)*15;

        $phql = "SELECT DISTINCT bills.*, book.*,book_group.name
                  FROM Bills as bills LEFT JOIN Book as book ON book.id = bills.book_id 
                  INNER JOIN BookGroup as book_group on book.group_id = book_group.id
                  WHERE bills.created_at IS NOT NULL ".$w;
          
        $paginate = $this->modelsManager->executeQuery($phql)->toArray();

        $phql1 = "SELECT DISTINCT bills.*, book.*,book_group.name
                  FROM Bills as bills LEFT JOIN Book as book ON book.id = bills.book_id 
                  INNER JOIN BookGroup as book_group on book.group_id = book_group.id
                  WHERE bills.created_at IS NOT NULL".$w."
                  ORDER BY bills.id DESC LIMIT ".$off.",15";
        $bills = $this->modelsManager->executeQuery($phql1);  
        $count = count($paginate);
        $a = $this->request->getQuery();
        unset($a['_url'], $a['page']);
        $arr = [];
        foreach ($a as $key => $val){
          $arr[] = $key.'='.$val;
        }
        $search = implode('&', $arr);

        $totalItems = count($paginate);
        $itemsPerPage = 15;
        $currentPage = $pages;
        $urlPattern = $this->url->get('bills/?page=(:num)&'.$search);
        $paginator = new Paginator($totalItems, $itemsPerPage, $currentPage, $urlPattern);
        $paginator->setMaxPagesToShow(7);
        $this->view->setVars(
          [
            'bills'=>$bills,
            'group_id'=>$group_id,
            'name'=>$name,
            'class_id'=>$class_id,
            'count' =>$count,
            'startDate'=>$startDate,
            'endDate'=>$endDate,
            'teachers'=>$teachers,
            'group_ids'=>$group_ids,
            'paginator'=>$paginator,
            'teacher' =>$teacher,
            'off' =>$off,
          ]);
      }
      public function createAction()
      {
        $this->assets->addJs('//cdn.ckeditor.com/4.5.9/standard/ckeditor.js');
        $teachers = Teacher::find(['conditions' => 'publish = :status:', 'bind'=>['status' =>1]]);

        $bills = new Bills();
        $books = Book::find();
        $group_id = BookGroup::find();

        if($this->request->isPost())
        { 
     
        $bill_code = $this->request->getPost('code');
        $book_id = $this->request->getPost('book_name');

        $book_name =  json_encode($book_id);
        $book_name =  str_replace('"', '',$book_name);
        $book_name =  str_replace('[', '',$book_name);
        $book_name =  str_replace(']', '',$book_name);

        foreach ($book_id as $key => $value) {
          $books1 = Book::findFirst($value);
          $number_book = $books1->total_book;
          $number_book = $number_book - 1;
          $books1->total_book = $number_book;
          $success = $books1->update();  

          $price_book[] = $books1->price;

        }
        // tính tổng của các giá sách cộng lại
        $tot_price = array_sum($price_book);

        $birthday = $this->request->getPost('birthday');
        $name_customer  = $this->request->getPost('name_customer');
        $discount  = $this->request->getPost('discount');
        $contenmail  = $this->request->getPost('contenmail');
        $created_bys = $this->session->get('user_fullname');

        $date_birthday = date_create($birthday);
        $birthday_customer = date_format($date_birthday,"Y-m-d H:i:s");

        // tính thổng số tiền theo % discount
        $price_tru = ($tot_price/100) * $discount;
        $total_price = $tot_price - $price_tru;

        $bills->price = $tot_price;
        $bills->total_price = $total_price;
        $bills->bill_code = $bill_code;
        $bills->book_id = $book_name;
        $bills->name_customer = $name_customer;
        $bills->discount = $discount;
        $bills->birthday_customer  = $birthday_customer;
        $bills->note  = $contenmail;
        $bills->created_by = $created_bys;

        $success = $bills->save();
        if($success)
        {
          $this->flashSession->success('Thêm hóa đơn thành công');
          $this->response->redirect('bills');
        }
        else
        {
          $messages  =$bills->getMessages();
          foreach ($messages as $message)
          {
            $this->flashSession->error($message);
          }
          Phalcon\Tag::setDefaults(get_object_vars($bills));

        }

      }
      $this->view->setVars(['group_id'=>$group_id,'books'=>$books]);
    }


    public function addvalidateAction(){
      $this->view->setRenderLevel(
        View::LEVEL_NO_RENDER
      );
      $code = $this->request->getPost('code', 'trim');
      $data = Book::findFirst(
        [
          'code = :code:',
          'bind'          => [
            'code' => $code
          ],
        ]
      );
      if(!$data){
        echo true;
      }else{
        echo false;
      }
      die;
    }

 
  public function detailAction($id)
  {
  
    $bills = Bills::findFirst($id);
    $book_id = $bills->book_id;
    $book_id = explode(',', $book_id);
    foreach ($book_id as $key => $value) {
      $books = Book::findFirst($value);
      $book_name[] = $books->name;
    }
    $this->view->setVars([
      'bills' => $bills,
      'book_name'=> $book_name,
    ]);

  }

  public function deleteAction($id)
  {
    $bills = Bills::findFirst($id);

    if($bills->delete())
    {
      $this->flashSession->success('Xóa hóa đơn thành công');
      $this->response->redirect('bills');
    }
    // $book->BookTeacher->delete();
    // $book->Republish->delete();
    // $book->HistoryRepublish->delete();
    // $book->BookTempMail->delete();

  }
    public function priceAction()
  {
       if ($this->request->isAjax() && $this->request->isPost()) {
           $book_id = $this->request->getPost('book_id');
           // $book_i = json_decode($book_id);
           foreach ($book_id as $key => $value) {
             $books = Book::findFirst($value);
             $price_book[] = $books->price;
           }
           $tot_price = array_sum($price_book);
            echo $tot_price .' '.'<strong>đ</strong>';
        exit();
        }
  }
      public function totalpriceAction()
  {
       if ($this->request->isAjax() && $this->request->isPost()) {
           $book_id = $this->request->getPost('book_id');
           $discount_per = $this->request->getPost('discount_per');
           // $book_i = json_decode($book_id);
           foreach ($book_id as $key => $value) {
             $books = Book::findFirst($value);
             $price_book[] = $books->price;
           }
            $tot_price = array_sum($price_book);
            $price_tru = ($tot_price/100) * $discount_per;
            $total_price = $tot_price - $price_tru;
            echo $total_price .' '.'<strong>đ</strong>';
        exit();
        }
  }

}