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
class ReportsController extends \ControllerBase
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
    $this->assets->addJs('assets/js/report.js');
    $this->assets->addJs('assets/js/filter_report.js');
    $this->assets->addJs('assets/js/chart/chart.js');

    $this->assets->addJs('js/datepicker.js');


    //them css hoac js ma xu ly rieng (do minh viet hoac tu thu vien) cho tung trang vao day (neu can thiet)
  }

  public function report_booksAction()
   {
      $now = date('Y-m-d', time());
      $end = date_create_from_format('Y-m-d H:i:s', $now . ' 23:59:59')->format('Y-m-d');
      $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->sub(new DateInterval('P7D'))->format('Y-m-d');

      $books = Book::find();
      foreach ($books as $key => $value) {
              $book_name = $value->name;
              $data_book[$book_name] = $value->total_book;
      }
      $book_sql = "SELECT DISTINCT  id,SUM(total_price) as total,created_by,created_at,book_id FROM Bills  WHERE 
              DATE_FORMAT(created_at,'%Y-%m-%d') >= '$start' 
              AND DATE_FORMAT(created_at,'%Y-%m-%d') <= '$end'
              GROUP BY created_at "; 
            
      $book_date = $this->modelsManager->executeQuery($book_sql)->toArray();
      foreach ($book_date as $key => $value1) {
              $book_id = $value1['book_id'];
              $book_id = explode(',', $book_id);
              foreach ($book_id as $key => $value) {
                $book = Book::findFirst($value);
                $book_names[] = $book->name;
              }
      }
      echo "<pre>";

      $book_bills = array_count_values($book_names);

      $bestsell_book = $inventory_book = $sold_out_book = array();
      // lấy ra  số lượng sách bán chạy và sách tồn kho
      foreach ($book_bills as $key => $value) {
              if($value > 2 ){
                  $bestsell_book1[$key] = $value;

              }else{
                  $inventory_book1[$key] = $value;
              }
      }
      // lấy ra số lượng sách sắp hết
      foreach ($data_book as $key_1 => $value_1) {
              if($value_1 < 2 ){
                // convert from string to int 
                  $sold_out_book[$key_1] = (int)$value_1;
              }
      }
      foreach ($bestsell_book1 as $key => $value) {
              $sell_book_key[] = $key;
              $bestsell_book[] = $value;
      }
      // var_dump($book_bills);
      // var_dump($sell_book_key);
      // exit();
       foreach ($inventory_book1 as $key => $value) {
              $inventory_book_key[] = $key;
              $inventory_book[] = $value;
      }
      $sell_book_key = json_encode($sell_book_key);
      $bestsell_book = json_encode($bestsell_book);

      $inventory_book_key = json_encode($inventory_book_key);
      $inventory_book = json_encode($inventory_book);

      foreach ($sold_out_book as $key => $value) {
              $soldout_book_key[] = $key;
              $soldout_book_value[] = $value;
      } 
      $soldout_book_key = json_encode($soldout_book_key);
      $soldout_book_value = json_encode($soldout_book_value);

      $this->view->setVars([
                  'start' => $start,
                  'end' => $end,
                  'sell_book_key' => $sell_book_key,
                  'bestsell_book' => $bestsell_book,
                  'inventory_book_key' => $inventory_book_key,
                  'inventory_book' => $inventory_book,
                  'soldout_book_key' => $soldout_book_key,
                  'soldout_book_value' => $soldout_book_value,
      ]);
  } 
  
  public function filterbooksAction()
  {
  if ($this->request->isAjax() && $this->request->isPost()) {
        $post = $this->request->getPost('post');
        if (isset($post) && is_array($post) && count($post)) {
          foreach ($post as $key => $val) {
                  if (empty($val['value'])) continue;
                  $data[$val['name']] = htmlspecialchars(nl2br($val['value']));
          }

        $error = false;
        if (empty($data['start']) || empty($data['end'])) {

              $error = true;
        }else{

            $start = $data['start'];
            $end = $data['end'];

            $start1 = strtotime($data['start']);
            $end1 = strtotime($data['end']);
                if ($end1 < $start1) {
                    $error = true;
                }
        }
        if (!$error) {
           $books = Book::find();
              foreach ($books as $key => $value) {
                      $book_name = $value->name;
                      $data_book[$book_name] = $value->total_book;
              }
              $book_sql = "SELECT DISTINCT  id,SUM(total_price) as total,created_by,created_at,book_id FROM Bills  WHERE 
                      DATE_FORMAT(created_at,'%Y-%m-%d') >= '$start' 
                      AND DATE_FORMAT(created_at,'%Y-%m-%d') <= '$end'
                      GROUP BY created_at "; 
              $book_date = $this->modelsManager->executeQuery($book_sql)->toArray();
              if (isset($book_date) && is_array($book_date) && count($book_date)){ 
                  foreach ($book_date as $key => $value1) {
                          $book_id = $value1['book_id'];
                          $book_id = explode(',', $book_id);
                          foreach ($book_id as $key => $value) {
                            $book = Book::findFirst($value);
                            $book_names[] = $book->name;
                          }
                  }
                  $book_bills = array_count_values($book_names);
                  $inventory_book_key = $sell_book_key = $bestsell_book1 = $inventory_book1 = $bestsell_book = $inventory_book = $sold_out_book = $soldout_book_key = $soldout_book_value = array();
                  // lấy ra  số lượng sách bán chạy và sách tồn kho
                  foreach ($book_bills as $key => $value) {
                          if($value > 2 ){
                              $bestsell_book1[$key] = $value;

                          }else{
                              $inventory_book1[$key] = $value;
                          }
                  }
                  // lấy ra số lượng sách sắp hết
                  foreach ($data_book as $key_1 => $value_1) {
                          if($value_1 < 2 ){
                            // convert from string to int 
                              $sold_out_book[$key_1] = (int)$value_1;
                          }
                  }
                  foreach ($bestsell_book1 as $key => $value) {
                          $sell_book_key[] = $key;
                          $bestsell_book[] = $value;
                  }
                   foreach ($inventory_book1 as $key => $value) {
                          $inventory_book_key[] = $key;
                          $inventory_book[] = $value;
                  }
                  $sell_book_key = json_encode($sell_book_key);
                  $bestsell_book = json_encode($bestsell_book);

                  $inventory_book_key = json_encode($inventory_book_key);
                  $inventory_book = json_encode($inventory_book);

                  foreach ($sold_out_book as $key => $value) {
                          $soldout_book_key[] = $key;
                          $soldout_book_value[] = $value;
                  } 
                  $soldout_book_key = json_encode($soldout_book_key);
                  $soldout_book_value = json_encode($soldout_book_value);

                  $this->view->partial('reports/filter-books', [
                              'sell_book_key' => $sell_book_key,
                              'bestsell_book' => $bestsell_book,
                              'inventory_book_key' => $inventory_book_key,
                              'inventory_book' => $inventory_book,
                              'soldout_book_key' => $soldout_book_key,
                              'soldout_book_value' => $soldout_book_value,
                  ]);
              }
              else{
                echo '<div class="mb0 alert alert-danger">Không có kết quả tìm kiếm!</div>';
              }

        }else{
            echo '<div class="mb0 alert alert-danger">Vui lòng chọn ngày bắt đầu và kết thúc đúng định dạng!</div>';
        }
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
      }
    }
  }

  public function report_billsAction()
  {
      $now = date('Y-m-d', time());
      $end = date_create_from_format('Y-m-d H:i:s', $now . ' 23:59:59')->format('Y-m-d');
      $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->sub(new DateInterval('P7D'))->format('Y-m-d');
      $nhanvien = Teacher::find();
      $current_user = $this->session->get('user_fullname');
      // lấy ra mảng ngày 
      function getDatesFromRange($start, $end, $format = 'm/d/Y') {
              $array = array();
              $interval = new DateInterval('P1D');

              $realEnd = new DateTime($end);
              $realEnd->add($interval);

              $period = new DatePeriod(new DateTime($start), $interval, $realEnd);

              foreach($period as $date) { 
                  $array[] = $date->format($format);
              }

              return $array;
      } 
      $array_date1 = getDatesFromRange($start,$end);
      $array_date = json_encode($array_date1);
      echo "<pre>";

      echo $bill = "SELECT DISTINCT  SUM(total_price) as total,created_by,created_at FROM Bills  WHERE 
               DATE_FORMAT(created_at,'%Y-%m-%d') >= '$start' 
              AND DATE_FORMAT(created_at,'%Y-%m-%d') <= '$end'
              GROUP BY  DATE_FORMAT(created_at,'%Y-%m-%d')"; 

      $bill_date = $this->modelsManager->executeQuery($bill)->toArray();
      foreach ($bill_date as $key => $value) {
              $date = $value['created_at'];
              $date = date_create($date);
              $date = date_format($date,"m/d/Y");
              $date_val[$date] = $value['total'];
      }
      foreach ($array_date1 as $key => $value) {
              $date1 = $value;
              $d[$date1] = '0';
      }
      $arr = array_merge($d,$date_val);
      foreach ($arr as $key => $value) {
              $data_value[] = str_replace('"', '', $value);

      }
      $data_value = json_encode($data_value);

      $this->view->setVars([
                'start' => $start,
                'end' => $end,
                'nhanvien' => $nhanvien,
                'data_value' => $data_value,
                'array_date' => $array_date,
      ]);
  } 

  public function filterbillsAction()
  {
  if ($this->request->isAjax() && $this->request->isPost()) {
        $post = $this->request->getPost('post');
        if (isset($post) && is_array($post) && count($post)) {
          foreach ($post as $key => $val) {
                  if (empty($val['value'])) continue;
                  $data[$val['name']] = htmlspecialchars(nl2br($val['value']));
          }

        $error = false;
        $current_user = '';

        if (empty($data['start']) || empty($data['end'])) {

              $error = true;
        }else{

            $start = $data['start'];
            $end = $data['end'];
                if (isset($data['teacher'])) {
                  $user = $data['teacher'];
                  $current_user = "created_by = '".$user."' AND";
                }
            $start1 = strtotime($data['start']);
            $end1 = strtotime($data['end']);
                if ($end1 < $start1) {
                    $error = true;
                }
        }
        if (!$error) {
            function getDatesFromRange($start, $end, $format = 'm/d/Y') {
                    $array = array();
                    $interval = new DateInterval('P1D');

                    $realEnd = new DateTime($end);
                    $realEnd->add($interval);

                    $period = new DatePeriod(new DateTime($start), $interval, $realEnd);

                    foreach($period as $date) { 
                        $array[] = $date->format($format);
                    }
                    return $array;
            } 

            $array_date1 = getDatesFromRange($start,$end);
            $array_date = json_encode($array_date1);

            $bill = "SELECT DISTINCT  SUM(total_price) as total,created_by,created_at FROM Bills  WHERE $current_user
                         DATE_FORMAT(created_at,'%Y-%m-%d') >= '$start' 
                        AND DATE_FORMAT(created_at,'%Y-%m-%d') <= '$end'
                        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d')"; 
               
            $bill_date = $this->modelsManager->executeQuery($bill)->toArray();
            if (isset($bill_date) && is_array($bill_date) && count($bill_date)){ 
                $date_val = $data_value = array();
                foreach ($bill_date as $key => $value) {
                        $date = $value['created_at'];
                        $date = date_create($date);
                        $date = date_format($date,"m/d/Y");
                        $date_val[$date] = $value['total'];
                }
                foreach ($array_date1 as $key => $value) {
                        $date1 = $value;
                        $d[$date1] = '0';
                }
                if (isset($date_val) && is_array($date_val) && count($date_val)){ 
                        $arr = array_merge($d,$date_val);
                        foreach ($arr as $key => $value) {
                                $data_value[] = str_replace('"', '', $value);
                                $data_date[] =  $key;
                        }
                }

                $data_value = json_encode($data_value);
                $data_date = json_encode($data_date);
                
                $this->view->partial('reports/filter-bills', [
                            'data_value' => $data_value,
                            'data_date' => $data_date,
                ]);
            }
            else{
              echo '<div class="mb0 alert alert-danger">Không có kết quả tìm kiếm!</div>';
            }

        }else{
            echo '<div class="mb0 alert alert-danger">Vui lòng chọn ngày bắt đầu và kết thúc đúng định dạng!</div>';
        }
        $this->view->setRenderLevel(View::LEVEL_NO_RENDER);
      }
    }
  }

  public function report_employeeAction()
  {
      $now = date('Y-m-d', time());
      $end = date_create_from_format('Y-m-d H:i:s', $now . ' 23:59:59')->format('Y-m-d');
      $start = date_create_from_format('Y-m-d H:i:s', $now . ' 00:00:00')->sub(new DateInterval('P7D'))->format('Y-m-d');

      $this->view->setVars([
            'start' => $start,
            'end' => $end,
      ]);
  } 
}